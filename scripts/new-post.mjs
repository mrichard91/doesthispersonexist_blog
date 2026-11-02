import { writeFile, mkdir } from 'node:fs/promises';
import config from '../site.config.mjs';
const [slug, category='projects', ...words]=process.argv.slice(2);
if(!slug||!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)||!(category in config.categories)) throw new Error('Usage: npm run new -- post-slug [security|analysis|projects|running|archive] [Post title]');
const title=words.join(' ')||slug.replaceAll('-',' ');
await mkdir('content/posts',{recursive:true});
const file=`content/posts/${slug}.md`;
await writeFile(file,`---\ntitle: ${JSON.stringify(title)}\ndate: "${new Date().toISOString().slice(0,10)}"\ndescription: "Add a short description."\ncategory: ${category}\ntags: []\ndraft: true\n---\n\nWrite your post here.\n`,{flag:'wx'});
console.log(`Created ${file}. Remove draft: true when ready to publish.`);
