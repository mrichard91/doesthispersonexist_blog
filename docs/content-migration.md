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

## Mulling Security — recovered from the NAS backup

Recovered November 2, 2026 from `opensecnet/home/matt/websites.tar.gz` on the author’s NAS. Only the `virtual/mullingsecurity/` portion was extracted for migration. Raw backup files stay outside this public repository.

The archive contains **23 published posts**, dated **November 30, 2005 through March 14, 2006**, plus the home page, monthly index pages, and an Atom feed. All 23 monthly-index entries are represented by recovered article pages. The 2007 server tree also has later year directories, but those directories contain no post files. The other large root-level backups checked did not yield additional Mulling Security files. This is the recovered set, not a claim that every post ever published has been found.

For each post:

- The visible Blogger date header supplies the publication date; file and archive modification times are ignored.
- The saved Atom feed independently confirms nine dates and supplies their original `issued` timestamps, including timezone offsets. These are preserved as `publishedAt` and used in RSS and article publication metadata. Atom `created` and `modified` values are not substituted for the publication date.
- Only `.post-body` is converted to Markdown. Comments, navigation, profile data, Blogger controls, scripts, and other server contents are excluded.
- Article-body text was compared against the recovered HTML. It matches after allowing for whitespace and rendered list numbering. Code and log blockquotes are rendered as fenced code, with the original text preserved.
- Explicit links to recovered posts are mapped to the new local pages. Original dated paths redirect to their new post URLs on the blog domain. Other historical links remain as written; their destinations were not downloaded or executed.
- An archive note identifies the historical source. No article images were referenced in these 23 bodies.

`mullingsecurity-import.json` records titles, dates, original paths, timestamps where available, and SHA-256 provenance hashes. Build checks protect the original dates, timestamp values, source links, archive context, and old permalink redirects.

The repeatable importer runs only during maintenance, against an extracted blog directory:

```sh
node scripts/import-mullingsecurity.mjs /path/to/extracted/mullingsecurity
```

It skips existing posts to preserve subsequent edits. The static build never accesses the NAS or the original site.

| Original publication date | Post |
| --- | --- |
| 2005-11-30 | Virtualizing buffer overflows |
| 2005-12-01 | New Gmail Feature: False Security |
| 2005-12-01 | Security using virtualization |
| 2005-12-02 | Job Benefits: Identity Theft Assistance |
| 2005-12-05 | Update on Virtualizing Overflows |
| 2005-12-07 | Resources for VMM Based Security |
| 2005-12-12 | PHP Email Injection |
| 2005-12-13 | Vmware presentation on security |
| 2005-12-15 | Opening the Door to Security |
| 2005-12-19 | Even the experts get hacked |
| 2005-12-28 | New Java exploit site in the Ukraine |
| 2006-01-03 | Help Wanted: Identify these security nuggets |
| 2006-01-03 | Howto: Getting Remote Access to Windows Behind a Firewall |
| 2006-01-06 | Moving Browsing to the Edge |
| 2006-01-13 | More Information on Java Exploit |
| 2006-01-13 | Old Java Bug exploited from Ukraine |
| 2006-01-23 | Paper: Anatomy of a Phish III |
| 2006-01-23 | Snort sigs for latest Java Malware |
| 2006-01-26 | Update on ddabx.dll |
| 2006-02-06 | You Are the Weakest Link! |
| 2006-02-10 | Cisco Botnets? |
| 2006-02-15 | PHP Email Injection - Step by Step Part 1 |
| 2006-03-14 | Captchas to defeat SSH brute force attacks |
