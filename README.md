# blog.doesthispersonexist.com

Matt Richard’s static blog. Markdown in Git, generated HTML on Cloudflare Pages. No server code, database, analytics, external fonts, or browser requests to Medium. The optional browser JavaScript handles search and the light/dark theme; all posts and category pages work without it.

## Write and publish

Use Node 22 or newer:

```sh
npm ci
npm run new -- my-project-note projects "My project note"
```

Edit the new file in `content/posts/`. Remove `draft: true` when ready to publish. Commit and push to `main`; Cloudflare Pages builds and deploys the site.

```yaml
---
title: "My post"
date: "2026-11-02"
description: "A short description for the index and RSS feed."
category: projects
tags: [tools, python]
draft: true
---

Write in Markdown.
```

Categories: `security`, `analysis`, `projects`, `running`, `archive`. Add or rename them in `site.config.mjs`. Tags use lowercase words with hyphens. Filenames become permanent URLs: `content/posts/my-post.md` → `/posts/my-post/`.

`date` means the earliest verified original publication date. It drives the visible date, chronological order, RSS, and article publication metadata. Keep it unchanged when editing or importing a post; builds never replace it with a file, commit, import, or deployment date. For a later republication, `sourceDate` can separately record the linked source’s date. For example, Stonecat was originally posted November 4, 2018, then republished on Medium April 24, 2023. If an original date cannot be verified, resolve it before publication rather than guessing.

Add images to `public/media/` and link them as `![Meaningful description](/media/example.png)`. The entire `public/` directory is copied to the output.

**Drafts in a public GitHub repo are still public source files.** `draft: true` only excludes a post from the generated website, including its route, indexes, feed, and sitemap. Keep genuinely private writing outside the repository. `content/drafts/` is never read by the builder.

## Preview and check

```sh
npm run dev
```

Open <http://127.0.0.1:4321>. Re-run the command after edits; there is no file watcher.

```sh
npm run build
npm run check
```

`dist/` is disposable build output. The checker validates internal page, image, script, and stylesheet links, and confirms no runtime functions or remote Medium article images are present. GitHub Actions runs both commands on pushes and pull requests. Cloudflare also runs the checks before deploying.

## Hosting

- Cloudflare Pages project: `doesthispersonexist-blog`
- GitHub repository: <https://github.com/mrichard91/doesthispersonexist_blog>
- Production branch: `main`
- Build command: `npm run build && npm run check`
- Build output: `dist`
- Node version: `22` (also specified in `.nvmrc`)
- Custom domain: <https://blog.doesthispersonexist.com>

Git integration handles deployment without a Cloudflare API token in GitHub. Cloudflare serves only static assets; there are no Pages Functions or Workers scripts in this project. A top-level `404.html` preserves proper missing-page behavior instead of an SPA fallback.

## Content migration

See [docs/content-migration.md](docs/content-migration.md) for the imported articles, provenance, and Mulling Security recovery status. The article text is preserved; new short descriptions, category labels, and tags are editorial metadata. Medium imports retain the original publication date and a link to the original. `docs/medium-import.json` records original image URLs and their local copies.

The migration script accepts a JSON array of `{ title, link, date, html }` extracted from your Medium RSS feed. It is a one-time maintenance utility, separate from the site build:

```sh
npm run import:medium -- /path/to/medium-feed.json
```

It skips existing post files, so re-running it does not overwrite edits. Inspect imports before publishing; any new articles need a summary added to the script. Ordinary builds are offline and use only the files in this repository.

## Source layout

- `content/posts/`: published Markdown and optionally website-excluded drafts
- `public/`: CSS, small browser script, favicon, images, Cloudflare headers
- `scripts/build.mjs`: static renderer for posts, categories, tags, RSS, sitemap, and 404
- `site.config.mjs`: site identity, links, and categories
- `templates/post.md`: copyable post template

No project announcement posts have been created. The Projects category is ready for future additions.
