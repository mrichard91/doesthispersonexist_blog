---
title: Update on ddabx.dll
date: '2006-01-26'
publishedAt: '2006-01-26T07:57:00-05:00'
description: I get a ton of hits to my blog from search engines for the string "ddabx.dll".
category: archive
tags:
  - mullingsecurity
  - security
  - malware-analysis
source: 'http://www.mullingsecurity.com/2006/01/update-on-ddabxdll.html'
sourceName: Mulling Security
---
I get a ton of hits to my blog from search engines for the string "ddabx.dll". I feel really guilty since I've been withholding knowledge from everyone who hits my site because I only have one tiny blog entry that says "what's ddabx.dll?" with no answers. Well now you can get some answers. Sorry.  
  
After a little forensic review of ddabx.dll I determined that it's a variant of conhook. The dll itself spawns a thread and attaches to winlogon.exe, explorer.exe and a seemingly random third executable. The thread is extremely difficult to kill even using tools like [Process Explorer](http://www.sysinternals.com/Utilities/ProcessExplorer.html). Most anti-virus applications are able to detect the binary located on disk (usually c:\\$WINDIR\\system32\\ddabx.dll) but are unable to successfully remove it from the system. F-Prot was detecting it as W32/Downloader.ISZ. Most seem to fail at recognizing the binary once loaded into memory because of it's dynamic runtime alterations.  
  
What was really killing me while I was doing my research was that it didn't appear to do anything. In many analysis it's fairly straightforward to setup a sandbox environment, run the malware and capture all of it's actions. The problem with ddabx.dll was that it didn't do anything. No outbound network connections, no new file handles, nothing.  
  
After jumping through hoops I was finally able to do some analysis on the binary while loaded in memory. This turned up a whole host of new information. I found that the dll itself remains resident in memory waiting for the right time to download an update from updates from the following urls (really the same server):  

> http://ushuistov.net/cgi-bin/check/autoaff  
> http://202.67.220.235/cgi-bin/check/autoaff

It is this download capability that gives the malware it's designation as a "downloader" by most AV vendors. It really doesn't do much besides wait, check for updates every so often and wait some more. The dll also monitors the "health" of it's other instances and will restart any of them if tampered with.  
  
Most of this information was not available through static analysis of the dll. I did most of my research a little outside the box by looking at the memory image of a suspended vmware machine. I'll give more details on that process another day.  
  
If you came to this blog entry looking for the simplest way to get rid of ddabx.dll - boot with a linux live cd and issue "dd if=/dev/zero of=/dev/hda" and reinstall Windows. If you're patient I have some additional research on how most Spyware and AV agents stack up that I'll post.
