---
title: Security using virtualization
date: '2005-12-01'
description: >-
  In the course of some light research for Virtualizing buffer overflows I came
  across some interesting research from a couple of researchers at Stanford on
  using virtual machine monitors…
category: archive
tags:
  - mullingsecurity
  - security
  - virtualization
source: 'http://www.mullingsecurity.com/2005/12/security-using-virtualization.html'
sourceName: Mulling Security
---
In the course of some light research for [Virtualizing buffer overflows](/posts/mullingsecurity-virtualizing-buffer-overflows/) I came across some [interesting research](http://suif.stanford.edu/papers/vmi-ndss03.pdf) from a couple of researchers at Stanford on using virtual machine monitors for host based intrusion detection. In the paper they discuss some of the ways that virtual machine monitors have advantages over traditional IDS mechanisms since they have a unique and unobstructed view of the guest. They also discuss how the VMM can prevent certain types of attacks that depend on modifying kernel structures. It's an interesting read that I highly recommend.  
  
My point from yesterday is that virtualization has two big security implications, on one hand virtualization allows for extremely difficult to subvert security measures and on the other it allows extremely difficult to detect or defeat malware.
