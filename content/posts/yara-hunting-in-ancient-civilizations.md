---
title: YARA hunting in ancient civilizations
date: '2023-04-26'
description: >-
  Early YARA detection work, sharing analyst knowledge, and why a readable rule
  language mattered more than technical superiority.
category: security
tags:
  - threat-intelligence
  - yara
source: >-
  https://medium.com/@mrichard91/yara-hunting-in-ancient-civilizations-3dd096eef8c7
---
**tl;dr —** The critical aspect of threat detection as a team sport was that YARA let us leverage our collective insights without learning an obtuse syntax. Instead, everyone could contribute what they saw in easy-to-read, human parseable grammar.

Imagine if we had some kind of requirements gathering and technical bake-off to pick how to share these insights for detection. The technocratic answer would surely not have been YARA. A hard-won lesson for me over the years is that the user experience frequently is far more critical than the capabilities. All this is to say the success was in finding the technology that enabled humans rather than the absolute best technical solutions.

## Background

In a previous epoch of threat intelligence, I worked at Raytheon. We built a system to detect unknown exploits in document formats used by advanced threat actors to attempt to infiltrate our network. In 2009, YARA was still a new tool; it had only recently been released as version 1.0 and had a single maintainer — plusvic. This is a short piece to capture what I was thinking, replay some of the slides from a presentation I gave many times on how to hunt with YARA, and tie together a few key lessons that I think still apply today. The slides for the “Advanced Analysis of Malicious Documents” talk are [here](https://docplayer.net/39260920-Advanced-analysis-of-malicious-documents-matt-richard.html).

![](/media/medium/b22fb5388f00da64.png)

Intro slide for YARA with some “facts” that are only partially true now

## Key Takeaways

1.  YARA is a simple, fast, and easy-to-integrate tool for classifying files and creating “features” through rules simply and declaratively. Every version since v1.1 has been helpful and valuable in threat intelligence.
2.  Despite point #1, there are negatives to using YARA for production detection; sometimes, other tools are more effective than YARA (then and now). This mainly boils down to unpacking, uncompressing, and looking inside complex object types, which is not a key feature of YARA.
3.  Simple and powerful grammar can democratize a concept in a way that the idea itself may fail to do, in this case, sharing of bespoke detection signatures. The ability to share often trumps the depth of the technology.

## Why YARA?

Fifteen years ago, we knew advanced actors were leveraging unpatched vulnerabilities in Adobe Acrobat Reader and Microsoft Office via email attachments to compromise systems but lacked meaningful defenses. We couldn’t patch systems since the patches didn’t exist, we couldn’t rely on existing antivirus and content filtering tools since they didn’t have signatures, and the best we could hope for was to train users not to open attachments (note: I think this defense is about as good now as then, which is to say it doesn’t work.) We needed a toolchain to evaluate these documents and find the malicious ones, knowing we wouldn’t know exactly what to look for. We eventually developed a multi-stage approach, which is now quite common in commercial tools, including dynamic analysis, feature extraction, machine learning, and signature scanning. YARA became the lynchpin of the signature scanning portion of the solution because it was easy to write, simple to share, and gave us an easy way to integrate the malware analysts and network defenders through a shared language.

Our early efforts had focused on using ClamAV, which also allows the deployment of bespoke signatures, is faster than YARA, and is more widely deployed. ClamAV was great for detection — we could catch the same files, have more flexible unpacking of the data structures, and get predictable run times. ClamAV lacked a way to convey context and readability, so we could easily interpret results. ClamAV also stopped on the first match, which is excellent for performance but not helpful if you want to combine multiple signature hits on a file for compound detection.

![](/media/medium/f22dac141a65af6f.png)

ClamAV signature for XOR shellcode in documents, taken from “Advanced Analysis of Malicious Documents.”

Compare ClamAV signatures with YARA — YARA allows us to combine elements logically, provide some documentation, get all the matches, and use the full results in making detection decisions. When we later shared these signatures with partners, we added comments and metadata to make them more effective for the humans looking at the results.

![](/media/medium/dfc76e2aeb96b22a.png)

Example YARA signature from “Advanced Analysis of Malicious Documents”

## Onward to larger places

After we started sharing these signatures, other companies began integrating YARA into their content detection systems. There were a lot of successes in detecting novel exploits by looking for what we could now call “weaponization” artifacts. These artifacts, which the presentation goes into detail itemizing, provided enduring detection even when the exploit itself changed.

Weaponization artifacts:

1.  Payload encoding — how the final payload was embedded in the document
2.  Shellcode — specific machine instruction sequences indicative of exploits (jmp/call/pop)
3.  Egg/payload markers — many exploits had specific sequences used by shellcode to hunt for the final payload; these sequences (eggs) were often reused over many exploits.
4.  Document metadata — names, template code, timezones, and other weak but enduring indicators that could be combined

![](/media/medium/9e7f8533b9c9b073.png)

Weaponization signature overview from “Advanced Analysis of Malicious Documents”

## Experiences with YARA in other projects

Over the years, I’ve integrated Yara into many projects, some of which had a large reach. For example, I built many malware zoo and curation tools, such as [CRITs](https://crits.github.io/), that used YARA to triage and classify malware samples, email contents, and network packet captures. In 2009 I wrote “Docfiles,” the predecessor to CRITs, whose almost sole focus was ingesting document files, scanning them with tailored YARA signatures, and making it easy to find possible 0-days. I recently created a machine learning system for detecting malicious RTF documents that leverages YARA as a feature extraction engine by defining RTF elements as signatures and capturing stats from YARA callbacks.

YARA has shined in the flexibility to prototype and design solutions quickly, democratize rule writing and distribution, and provide a common lingua franca for threat intel communities.
