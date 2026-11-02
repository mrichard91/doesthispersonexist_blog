---
title: "Omnipotent adversary fallacy — should you give up your asymmetric advantages in cyber threat intel?"
date: "2023-05-11"
description: "What defenders give up when they assume an adversary can see and do everything."
category: security
tags: ["threat-intelligence"]
source: "https://medium.com/@mrichard91/omnipotent-adversary-fallacy-should-you-give-up-your-asymmetric-advantages-in-cyber-threat-intel-55cc9dbbab4"
---

![](/media/medium/ca253036f148ffe0.jpg)

I previously shared some [common cyber threat intelligence biases](https://medium.com/@mrichard91/common-cyber-threat-intel-biases-9d6f410f5829) I have seen across many teams and organizations. The fallacy of the omnipotent adversary cuts deep to the heart of why we do cyber threat intel (CTI) and what outcomes we hope to achieve. The primary goal of CTI is to generate asymmetric advantages for defenders to mitigate the natural advantage enjoyed by attackers. For defenders, this means balancing the availability of intelligence to protect as many assets as possible while keeping sources and methods hidden from adversaries.

This post tries to help inform the questions — is tweeting about infrastructure, malware, and operational security mistakes best helping defenders or adversaries? Would adversaries have known we know and changed anyway? How should we share what we learn? At the end of the article, I provide two public disclosure as thought exercises to illustrate the many messy tradeoffs involved — CVE-2009–0658 and Intrusion Truth.

_My bottom line — defenders create asymmetries by finding repeated signals and deploying that intelligence; revealing this information is necessary to protect others but comes at the cost of potential exposure, which negates some of the benefits. The security game is not changed by CTI; it is merely nudged to slight advantages based on how well the intelligence is managed._

### Assumptions

Here are a few assumptions to frame the problem:

1.  While adversaries can’t know and see everything (they are not omnipotent!), they can read blogs and use search engines. They can collect information about what defenders know and choose to respond. Although responses are optional, each adversary has a different calculus, which may vary by situation.
2.  Defenders create an asymmetric advantage when they use information about an adversary or TTP to create detection, mitigation, or deception that reduces the effectiveness or raises the costs to an adversary. They gain a more significant advantage when they share this with others that can further leverage it. Conversely, they lose that advantage when the adversary knows and works around it.
3.  Effective asymmetries are about uncertainty; when an adversary can’t understand why a tool or technique isn’t effective, they have to spend a lot of resources to get around it. But, on the other hand, when they know the problem, they can quickly work around it.
4.  There is no solution to defending against human adversaries. Patch everything? Train all users to thwart social engineering perfectly? Protect all contractors and supply chain? Pay employees enough to keep them from being bribed for access? There’s still a way in.
5.  The inverse of “defenders have to be right all the time, attackers only have to be right once” is that attackers have to leave no trail that can be followed to continue using the same tactics, techniques, and procedures (TTPs) over time against many targets. This is nearly impossible for a complex adversary such as an intelligence organization, military unit, or for-hire company. This allows the defenders to find one mistake and take an advantage.
6.  Cyber threat intelligence has failed to “change the game” over the last 15 years despite the hype, marketing, more people, and more data. We have more adversaries, with more tools, with more attack surfaces to protect. Every lost advantage is a setback; failing to share what we know brings more success to adversaries.

> “My dear, here we must run as fast as we can, just to stay in place. And if you wish to go anywhere you must run twice as fast as that.” — Lewis Carrol, Alice in Wonderland

Bottom line — defenders create asymmetries by finding repeated signals and deploying that intelligence; revealing this information is necessary to protect others but comes at the cost of potential exposure, which negates the benefit. The game is not changed by CTI; it is merely nudged to slight advantages based on how well the intelligence is managed.

### Questions to ask when sharing

One of the critical tenets of CTI is that sharing is caring. Creating and sharing intelligence about adversaries allows other organizations to protect themselves and limit adversaries' success across an industry or geography. This is a delicate balance and should thoughtfully further your organization, community, industry, and national goals in mitigating cyber adversaries.

1.  What audience would most benefit from this intelligence? For example, is this an adversary targeting a specific vertical where sharing with an ISAC or industry group could quickly give many companies an asymmetric advantage?
2.  How likely is the information to drive action by the adversary? If the adversary quickly acted on this information, would that erode the asymmetric advantage?
3.  Is it possible to tier the information so that some portions can be shared with a more limited audience and others can be shared broadly to raise awareness? How can we minimize the adversary knowledge gain with the public portion while making it useful? Citation — tear lines, many Mandiant reports.
4.  Does disclosure promote a larger strategic goal you want the adversary to hear? For example, do we want to include so much detail that it will cause an adversary to rethink operations after the revelations? Citations — APT1 report, Intrusion Truth.

### **Example from the past — 2009 JBIG2 vulnerability**

Here is a case study on disclosure that speaks to the tradeoffs of different levels of disclosure and how that can influence adversary behavior. This example looks at a zero-day exploit in Adobe Readers used by various adversaries against a range of targets, including the Defense Industrial Base (DIB), activists, and other unknown targets.

![](/media/medium/4be4c5a20dd1854a.png)

Timeline of CVE-2009–0658 events as presented in “0day, gh0stnet and the JBIG2 disclosure debacle”

In 2009 adversaries exploited CVE-2009–0658 for over three months with no patch available. During those three months, different levels of information were released by Symantec, Shadowserver, Sourcefire, and on public mailing lists. For weeks information was shared among the defense industrial base, security vendors, and small groups of researchers. About five weeks after discovering in-the-wild exploitation, the Sourcefire research team published a blog post with enough details to detect and recreate the exploit. Many different threat actors quickly copied the resulting proof of concept code, and exploitation escalated until three weeks later when Adobe finally released a patch.

What is the takeaway? Initially, sharing the details in small groups helped protect some companies but almost certainly left many targets in the dark. The lack of broad mechanisms like ISACs to distribute information meant that only a few had defenses for weeks. Conversely, when the vulnerability details were made public, the public could not protect itself, but adversaries used this information to their advantage.

You can see the talk given at Defcon by Steven Adair, including some of my slides, here — [https://www.youtube.com/watch?v=Kl4e7RCCj-w](https://www.youtube.com/watch?v=Kl4e7RCCj-w)

### Example — Intrusion Truth

Since 2017 an unidentified group named Intrusion Truth has been [publishing blog posts](https://intrusiontruth.wordpress.com/) and tweeting details about Chinese Ministry of State Security (MSS) cyber operations. The published content includes attributing individuals, motivations, and espionage targets. The content demonstrates a deep knowledge of adversary operations usually reserved only for well-resourced counterintelligence operations.

Here are some questions I’ve heard posed by network defenders about these disclosures as food for thought —

-   Does this actually improve the adversaries' abilities writ large?
-   We know they largely aren't being arrested/put in the corner. After all, they still have missions to fulfill and data to collect for their respective governments.
-   What are we deterring?
-   Is the public able to measure the effects? Has this been useful?
-   Are we merely giving them report cards that they can take to improve everything, thus killing defenders' visibility and making it harder to defend?
-   Who benefits the most from this equation?
