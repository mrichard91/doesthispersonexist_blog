# Content migration

Initial import: November 2, 2026.

## Medium

The feed at <https://medium.com/feed/@mrichard91> returned ten full-text articles, matching all ten Medium article links listed in the public `on_analysis` README at the time of import:

| Medium publication date | Title |
| --- | --- |
| 2023-12-22 | The Mistaken PowDesk Threat Intel |
| 2023-05-11 | Omnipotent adversary fallacy — should you give up your asymmetric advantages in cyber threat intel? |
| 2023-05-08 | Common Cyber Threat Intel Biases |
| 2023-04-28 | The life lessons of faceplanting |
| 2023-04-26 | YARA hunting in ancient civilizations |
| 2023-04-24 | Stonecat Race Report — First 50 miler |
| 2022-11-12 | Do fake accounts on twitter affect stock prices? |
| 2022-02-20 | Pragmatic Detection of GAN Profiles |
| 2022-02-10 | LinkedIn GAN Network Analysis |
| 2020-06-07 | How accurate are IHME models in Sweden? |

Stonecat explicitly states “Reprinted from Facebook November 4, 2018.” Its blog publication date is therefore **2018-11-04**; `sourceDate: 2023-04-24` separately preserves the Medium republication date. The homepage, article header, sorting, RSS, and article metadata all use the original 2018 date. The import manifest records both dates, and the build checks guard against accidentally changing imported publication dates.

Text was converted from feed HTML to Markdown. The RSS tracking pixel was removed. Article images were downloaded into `public/media/medium/`; originals and local paths are recorded in `medium-import.json`. Each post links to its original Medium article. Original publication dates were retained. Heading levels were normalized beneath the page title. Medium’s bare preformatted blocks were converted to fenced Markdown; all seven imported code blocks were checked against the original feed text. This verifies coverage against the README, not against a complete Medium account export; RSS feeds may omit older posts. If an account export contains more posts, they can be imported later.

## Selected on_analysis pieces

Two additional pieces were selected from the public repository, without copying unpublished local files:

| Date in original | Title | Original |
| --- | --- | --- |
| 2023-05-16 | How to do good work in Cyber Threat Intelligence | `cti/doing_good_work.md` |
| 2023-10-01 | Golang Detection Notes | `cti/malware_analysis/golang_detection.md` |

Source repository: <https://github.com/mrichard91/on_analysis>, inspected at commit `051e3db8bbfe459e178ed299342c5051b0f0bf2e`. Body text was preserved, with the duplicated title and author/date line moved into post metadata. Titles, dates, and source links remain visible. The remaining material stays in the original repository. Short outlines, course notes, PDF collections, and newer long-form malware analyses were not automatically republished. Two Medium mirrors also overlap with on_analysis; they appear only once in this blog.

## Mulling Security — recovery pending

Original domain confirmed by the author: `mullingsecurity.com`.

No original posts have yet been recovered. On November 2, 2026, the Wayback CDX query timed out and Internet Archive availability requests returned HTTP 429. Search found a historical reference to Matt Richard of Mullingsecurity.com in [The Life and Times of Ddabx.dll (2006)](https://mnin.org/write/2006_ddabx_lifetimes.pdf), but that is a third-party paper, not a copy of the blog. It has not been republished here.

Next recovery sources:

1. A WordPress XML/WXR export, database SQL dump, or old server backup. Preserve the original before extracting anything. Look for `wp_posts`, `wp_postmeta`, and `wp-content/uploads`; import only actual published posts, not users, passwords, comments, or server configuration.
2. Wayback snapshots for `mullingsecurity.com` and `www.mullingsecurity.com`, including feed and individual post URLs, when the archive is reachable.

Recovered posts should retain their original dates, source/snapshot URL, and an archive note explaining the historical context. Put them in the `archive` category (with security tags as appropriate). Preserve image captions and technical examples. Do not invent missing text or infer publication dates from download timestamps. Check recovered posts locally before pushing them to the public repo.
