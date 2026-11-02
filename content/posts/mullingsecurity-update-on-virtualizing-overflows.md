---
title: Update on Virtualizing Overflows
date: '2005-12-05'
description: >-
  I had some great feedback and discussion with a number of individuals on the
  Virtualizing Buffer Overflows post.
category: archive
tags:
  - mullingsecurity
  - security
  - virtualization
source: 'http://www.mullingsecurity.com/2005/12/update-on-virtualizing-overflows.html'
sourceName: Mulling Security
---
I had some great feedback and discussion with a number of individuals on the [Virtualizing Buffer Overflows](/posts/mullingsecurity-virtualizing-buffer-overflows/) post. It is by far the most popular post on [this blog.](http://mtsb.blogspot.com/) Also if you have an RSS reader make sure to add http://mtsb.blogger.com/atom.xml to keep up on the latest posts.  
  
In the first post I never intended to fully illustrate the unique scenarios that I've been looking into. This should give a clearer picture of where I was coming from, after all context is everything.  
  
The first scenario hinted at in [http://mtsb.blogspot.com/2005/11/virtualizing-buffer\-overflows.html](/posts/mullingsecurity-virtualizing-buffer-overflows/) is the shrewd attacker and untrusted host. In this situation there should be some very creative ways to inject code into the guests in such a way as to be non-persistent and nearly impossible to detect from the guest perspective. This is especially pertinent to my day job where we are working to provide security to critical guest machines that may be running on untrusted hosts. The primary issue being what are the risks associated with an administrator who is not cleared to access a sensitive guest but does have root access to the host. I wouldn't argue this is a good situation but one in which the risks need to be understood.  
  
The second case is a trusted host and VMM as a mechanism protect the integrity of the guest. What is interesting here is that some practical work on commodity systems such as Vmware and the Linux kernel has already been done [http://mtsb.blogspot.com/2005/12/security-using-virtualization.html](/posts/mullingsecurity-security-using-virtualization/). One of the most interesting practical implications is that using a modified version of vmware you can mark certain memory pages as read-only at the "virtual hardware" layer. So in this case instead of a passive alarm or panic the virtual hardware transparently prevents the modification without risking availability. This happens to be especially useful for common kernel targets like the sys\_call table.  
  
The last case I envision researching is utilizing the virtual environment for better forensic response. My thinking is that the real advantage comes in being able to investigate certain parts of the live system with almost zero modification. Since any traditional investigation on a live system requires modifying the live system in some discreet way virtualization might provide a less intrusive and more accurate process. My test case will be using [http://www.honeynet.org/scans/scan29/](http://www.honeynet.org/scans/scan29/) and some new forensic techniques specific to Vmware. [I've already done a traditional analysis](http://www.honeynet.org/scans/scan29/sol/mrichard/scan29.html) so the virtualized approach should be interesting.  
  
Hopefully some of the research can help develop more secure virtualization technologies. For example imagine a version of Vmware able to enforce RBAC at the virtual hardware level and prevent certain types of malicious code on the guest such as sniffers and kernel alteration.
