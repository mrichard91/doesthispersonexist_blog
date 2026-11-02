import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import matter from 'gray-matter';
async function walk(dir){return(await Promise.all((await readdir(dir,{withFileTypes:true})).map(d=>d.isDirectory()?walk(path.join(dir,d.name)):path.join(dir,d.name)))).flat();}
const files=await walk('dist');
assert(files.includes('dist/404.html'),'Missing real 404 page');
assert(!files.some(f=>/(_worker\.js|\/functions\/)/.test(f)),'Unexpected runtime code');
const ids=new Map();
for(const file of files.filter(f=>f.endsWith('.html'))){const html=await readFile(file,'utf8');ids.set(file,new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1])));}
let links=0;
for(const file of ids.keys()) {
  const html=await readFile(file,'utf8');
  assert(html.includes('<html lang="en">'),`Missing language: ${file}`);
  assert(html.includes('rel="canonical"'),`Missing canonical: ${file}`);
  assert(!/https:\/\/(?:cdn-images|miro|medium.com\/_\/stat)/.test(html),`Remote article image: ${file}`);
  for(const [,attr,value] of html.matchAll(/\b(href|src)="([^"]+)"/g)){
    if(!value.startsWith('/') || value.startsWith('//'))continue;
    const [pathname,fragment]=value.split('#');
    let target=path.join('dist',decodeURIComponent(pathname).split('?')[0]);
    try {if((await stat(target)).isDirectory())target=path.join(target,'index.html');await stat(target);}catch{throw new Error(`Broken ${attr}: ${value} in ${file}`);}
    if(fragment && ids.has(target))assert(ids.get(target).has(fragment),`Missing anchor ${value} in ${file}`);
    links++;
  }
}
assert((await readFile('dist/feed.xml','utf8')).includes('<rss version="2.0"'),'Missing RSS');
// Migration dates are source evidence, independent of file or deployment timestamps.
for (const record of JSON.parse(await readFile('docs/medium-import.json', 'utf8'))) {
  const { data } = matter(await readFile(`content/posts/${record.slug}.md`, 'utf8'));
  const originalDate = record.originalDate ?? record.date;
  assert.equal(data.date, originalDate, `Original publication date changed: ${record.slug}`);
  if (record.originalDate) assert.equal(data.sourceDate, record.date, `Medium republication date changed: ${record.slug}`);
  const html = await readFile(`dist/posts/${record.slug}/index.html`, 'utf8');
  assert(html.includes(`<time datetime="${originalDate}">`), `Rendered publication date changed: ${record.slug}`);
}
console.log(`Checked ${ids.size} HTML pages and ${links} internal links/assets. No server functions or remote article images.`);
console.log('Imported publication dates match their recorded source dates.');
const redirects = await readFile('dist/_redirects','utf8');
for (const record of JSON.parse(await readFile('docs/mullingsecurity-import.json','utf8'))) {
  const {data} = matter(await readFile(`content/posts/${record.slug}.md`,'utf8'));
  assert.equal(data.date,record.date,`Archive date changed: ${record.slug}`);
  assert.equal(data.publishedAt,record.publishedAt,`Archive timestamp changed: ${record.slug}`);
  assert.equal(data.source,record.source,`Archive source changed: ${record.slug}`);
  if (data.draft === true) continue;
  const html = await readFile(`dist/posts/${record.slug}/index.html`,'utf8');
  assert(html.includes(`<time datetime="${record.date}">`),`Wrong archive date: ${record.slug}`);
  assert(html.includes('aria-label="Archive context"'),`Missing historical context: ${record.slug}`);
  assert(redirects.includes(`${record.originalPath} /posts/${record.slug}/ 301`),`Missing old permalink: ${record.slug}`);
}
console.log('Archive dates, original timestamps, context, and permalink redirects verified.');
