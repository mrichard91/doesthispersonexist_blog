import { readFile, writeFile, mkdir, access } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import TurndownService from 'turndown';

// Migration-time only. Normal builds never access Medium or any other network.
const input = process.argv[2];
if (!input) throw new Error('Usage: npm run import:medium -- /path/to/medium-feed.json');
const items = JSON.parse(await readFile(input, 'utf8'));
const td = new TurndownService({ headingStyle:'atx', codeBlockStyle:'fenced', bulletListMarker:'-' });
td.addRule('figure', { filter:'figure', replacement: content => `\n\n${content}\n\n` });
const summaries = {
  'the-mistaken-powdesk-malware': 'An imagined malware report, a real reminder to check sources, and the hazards of trusting a convincing story.',
  'omnipotent-adversary-fallacy-should-you-give-up-your-asymmetric-advantages-in-cyber-threat-intel': 'What defenders give up when they assume an adversary can see and do everything.',
  'common-cyber-threat-intel-biases': 'Recognizing the habits and assumptions that can quietly distort an intelligence assessment.',
  'the-life-lessons-of-faceplanting': 'A lesson from the trail, learned the hard way.',
  'yara-hunting-in-ancient-civilizations': 'An ancient city, a suspicious shipment, and a different way to think about detection.',
  'stonecat-race-report-first-50-miler': 'Notes from a first 50-mile race at Stonecat.',
  'do-fake-accounts-on-twitter-affect-stock-prices': 'An experiment in fake accounts, market signals, and the difficulty of drawing a useful conclusion.',
  'pragmatic-detection-of-gan-profiles': 'Practical techniques for identifying synthetic profile photos, with examples and limitations.',
  'linkedin-gan-network-analysis': 'Following connections through a network of likely inauthentic LinkedIn profiles.',
  'how-accurate-are-ihme-models-in-sweden': 'Examining Sweden’s COVID-19 data and the accuracy of early IHME projections.',
};
await mkdir('public/media/medium', {recursive:true});
await mkdir('content/posts', {recursive:true});
const report = [];
for (const item of items) {
  const url = new URL(item.link); url.search = '';
  const slug = url.pathname.split('/').pop().replace(/-[a-f0-9]{10,14}$/, '');
  const filename = `content/posts/${slug}.md`;
  try { await access(filename); console.log(`Preserved existing: ${filename}`); continue; } catch {}
  let html = item.html;
  // The feed adds an invisible read-tracking image to each entry. It is not article content.
  html = html.replace(/<img\b[^>]*src="https:\/\/medium\.com\/_\/stat[^>]*>/g, '');
  const sources = [...new Set([...html.matchAll(/<img\b[^>]*src="([^"]+)"/g)].map(m=>m[1].replaceAll('&amp;','&')))];
  const images=[];
  for (const src of sources) {
    const response=await fetch(src,{signal:AbortSignal.timeout(30000)});
    if(!response.ok) throw new Error(`Image download failed: ${response.status} ${src}`);
    const type=response.headers.get('content-type')||'';
    const ext=type.includes('png')?'png':type.includes('gif')?'gif':type.includes('webp')?'webp':'jpg';
    const local=`/media/medium/${createHash('sha256').update(src).digest('hex').slice(0,16)}.${ext}`;
    await writeFile(`public${local}`,Buffer.from(await response.arrayBuffer()));
    html=html.replaceAll(src,local).replaceAll(src.replaceAll('&','&amp;'),local);
    images.push({source:src,local});
  }
  let body=td.turndown(html).trim();
  const first=body.split('\n')[0];
  if(first.replace(/^#+\s*/, '').replace(/\s+/g,' ')===item.title.replace(/\s+/g,' ')) body=body.slice(first.length).trim();
  const running=/faceplanting|stonecat/.test(slug);
  const analysis=/stock-prices|ihme/.test(slug);
  const category=running?'running':analysis?'analysis':'security';
  const tags=running?['running']:analysis?['analysis']:/gan|linkedin/.test(slug)?['threat-intelligence','synthetic-identities']:/yara/.test(slug)?['threat-intelligence','yara']:['threat-intelligence'];
  const description=summaries[slug];
  if(!description) throw new Error(`Add a description for ${slug}`);
  const front=['---',`title: ${JSON.stringify(item.title)}`,`date: ${JSON.stringify(item.date)}`,`description: ${JSON.stringify(description)}`,`category: ${category}`,`tags: ${JSON.stringify(tags)}`,`source: ${JSON.stringify(url.href)}`,'---',''];
  await writeFile(filename,front.join('\n')+'\n'+body+'\n');
  report.push({slug,title:item.title,date:item.date,source:url.href,images});
  console.log(`Imported ${slug} (${images.length} images)`);
}
await writeFile('docs/medium-import.json',JSON.stringify(report,null,2)+'\n');
