import { readdir, readFile, writeFile, access } from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';
import domino from '@mixmark-io/domino';
import TurndownService from 'turndown';
import matter from 'gray-matter';

// Run against an extracted copy of the blog directory, never the whole server.
// This utility reads HTML as data; it does not execute or fetch archived content.
const root = process.argv[2];
if (!root) throw new Error('Usage: node scripts/import-mullingsecurity.mjs /path/to/extracted/mullingsecurity');
const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const hash = value => createHash('sha256').update(value).digest('hex');
const oldHosts = new Set(['mullingsecurity.com','www.mullingsecurity.com','mtsb.blogspot.com','mtsb.blogger.com']);
async function walk(dir) {
  return (await Promise.all((await readdir(dir, { withFileTypes:true })).map(d => d.isDirectory() ? walk(path.join(dir,d.name)) : path.join(dir,d.name)))).flat();
}
const files = (await walk(root)).filter(f => /\/\d{4}\/\d{2}\/[^/]+\.html$/.test(f)).sort();
const entries = files.map(file => ({ file, oldPath:'/'+path.relative(root,file).split(path.sep).join('/'), slug:'mullingsecurity-'+path.basename(file,'.html') }));
const routes = new Map(entries.map(e => [e.oldPath, `/posts/${e.slug}/`]));
const atomFile = path.join(root,'atom.xml');
const atomDates = new Map();
try {
  const feed = domino.createDocument(await readFile(atomFile,'utf8'));
  for (const entry of Array.from(feed.querySelectorAll('entry'))) {
    const link = Array.from(entry.querySelectorAll('link')).find(l => l.getAttribute('rel') === 'alternate');
    const issued = entry.querySelector('issued')?.textContent;
    if (link && issued) atomDates.set(new URL(link.getAttribute('href')).pathname, issued);
  }
} catch (error) { if (error.code !== 'ENOENT') throw error; }
const td = new TurndownService({ headingStyle:'atx', codeBlockStyle:'fenced', bulletListMarker:'-' });
td.addRule('empty-links', { filter: node => node.nodeName === 'A' && !node.textContent.trim(), replacement: content => content });
const descriptions = {
  'virtualizing-buffer-overflows': 'Exploring the security implications of a virtualization host’s ability to modify a guest’s memory and execution.',
  'you-are-weakest-link': 'Third-party browser plugins, ActiveX controls, and the limits of patching only Windows and Internet Explorer.',
  'paper-anatomy-of-phish-iii': 'Notes on Michael Ligh’s Anatomy of a Phish III and the phishing tools and techniques examined in the report.',
};
// The old Blogger template used blockquotes for both quotations and code/logs.
td.addRule('legacy-code', {
  filter: node => node.nodeName === 'BLOCKQUOTE' && (/font-family:\s*courier/i.test(node.innerHTML) || /^(?:alert tcp |snort: |GET http|To:|> To:)/m.test(node.textContent.trim())),
  replacement: (_content, node) => {
    const doc = domino.createDocument(`<div>${node.innerHTML.replace(/<br\s*\/?>/gi, '\n')}</div>`);
    return '\n\n```\n'+doc.querySelector('div').textContent.trim()+'\n```\n\n';
  },
});
let manifest = [];
try { manifest = JSON.parse(await readFile('docs/mullingsecurity-import.json','utf8')); } catch (error) { if (error.code !== 'ENOENT') throw error; }
for (const entry of entries) {
  const raw = await readFile(entry.file,'utf8');
  const doc = domino.createDocument(raw);
  const body = doc.querySelector('.post-body');
  const title = doc.querySelector('.post-title')?.textContent.trim();
  const dateLabel = doc.querySelector('.date-header')?.textContent.trim();
  const matched = dateLabel?.match(/^[A-Za-z]+,\s+([A-Za-z]+)\s+(\d{1,2}),\s+(\d{4})$/);
  if (!body || !title || !matched) throw new Error(`Missing original post/date: ${entry.file}`);
  const month = months.indexOf(matched[1])+1;
  const date = `${matched[3]}-${String(month).padStart(2,'0')}-${matched[2].padStart(2,'0')}`;
  if (!month || new Date(date+'T12:00:00Z').toISOString().slice(0,10) !== date || !entry.oldPath.startsWith(`/${date.slice(0,4)}/${date.slice(5,7)}/`)) throw new Error(`Inconsistent original date: ${entry.file}`);
  const publishedAt = atomDates.get(entry.oldPath);
  if (publishedAt && publishedAt.slice(0,10) !== date) throw new Error(`Feed date differs from page date: ${entry.file}`);
  if (body.querySelector('img')) throw new Error(`Article image requires recovery: ${entry.file}`);
  if (body.querySelector('script, iframe, form')) throw new Error(`Embedded content requires review: ${entry.file}`);
  const source = `http://www.mullingsecurity.com${entry.oldPath}`;
  const originalText = body.textContent;
  for (const link of Array.from(body.querySelectorAll('a[href]'))) {
    const target = new URL(link.getAttribute('href'), source);
    if (oldHosts.has(target.hostname) && routes.has(target.pathname)) link.setAttribute('href',routes.get(target.pathname));
    else if (!target.protocol.startsWith('http') && target.protocol !== 'mailto:') link.removeAttribute('href');
    else link.setAttribute('href',target.href);
  }
  const textDoc = domino.createDocument(`<div>${body.innerHTML.replace(/<br\s*\/?>/gi,'\n')}</div>`);
  const plain = textDoc.querySelector('div').textContent.replace(/\s+/g,' ').trim();
  const sentence = plain.match(/^.{25,}?\.(?:\s|$)/)?.[0]?.trim() ?? plain;
  const description = descriptions[path.basename(entry.file,'.html')] ?? (sentence.length > 190 ? sentence.slice(0,187).replace(/\s+\S*$/,'')+'…' : sentence);
  const tags = ['mullingsecurity','security'];
  if (/virtual|vmm|vmware/i.test(title)) tags.push('virtualization');
  if (/java|snort|ddabx|botnet/i.test(title)) tags.push('malware-analysis');
  const data = { title, date, ...(publishedAt ? {publishedAt} : {}), description, category:'archive', tags, source, sourceName:'Mulling Security' };
  // Undo Markdown escaping inside URLs so linkification preserves literal underscores.
  const content = td.turndown(body.innerHTML).replace(/https?:\/\/[^\s<>]+/g, url => url.replace(/\\+_/g,'_')).trim()+'\n';
  const filename = `content/posts/${entry.slug}.md`;
  try { await access(filename); console.log(`Preserved existing: ${filename}`); continue; } catch {}
  await writeFile(filename,matter.stringify(content,data));
  manifest.push({slug:entry.slug,title,date,...(publishedAt ? {publishedAt} : {}),dateEvidence:dateLabel,source,originalPath:entry.oldPath,sourceSha256:hash(raw),sourceTextSha256:hash(originalText),markdownSha256:hash(content)});
  console.log(`Imported ${date} ${title}`);
}
manifest.sort((a,b) => a.date.localeCompare(b.date) || a.slug.localeCompare(b.slug));
await writeFile('docs/mullingsecurity-import.json',JSON.stringify(manifest,null,2)+'\n');
