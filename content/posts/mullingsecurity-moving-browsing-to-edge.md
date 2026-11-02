---
title: Moving Browsing to the Edge
date: '2006-01-06'
description: >-
  The latest 0-day exploit for Windows caused me to reflect a bit on how we do
  "browsing".
category: archive
tags:
  - mullingsecurity
  - security
source: 'http://www.mullingsecurity.com/2006/01/moving-browsing-to-edge.html'
sourceName: Mulling Security
---
The latest 0-day exploit for Windows caused me to reflect a bit on how we do "browsing". The problem with the WMF vulnerability was that it caught everyone by surprise and those who weren't already prepared had few effective options. The best choice available was the "patch everything" approach which tends not to scale very well.  
  
When you look at the problem there were several effective fixes but none of them could be rolled out very quickly. The first option was use a browser other than IE and an email client other than Outlook/OE. The problem here is that if you hadn't already made the switch you weren't going to do it for more than 5 users in under a day. The next option was to use a non-Microsoft OS but again not an option if you hadn't already made the switch.  
  
So what is the main issue? Centralization. It's tough to implement quick workarounds to browser problems. In fact I've been finding it's tough to implement workarounds in 6 months in some cases.  
  
It occurred to me that maybe there is a better way to mitigate many of these circumstances. Maybe we should start thinking about pushing browsing to the edge. In other words let's setup a "bastion" host in a DMZ for the intent of surfing the web. We'll make this system accessible to our users via a terminal server session and let them surf with centralized security. Call this the "DMZ Terminal Server Browser" approach.  
  
This approach has some real benefits but it also has some real risks as well. Aside from security the question is whether or not it is cost effective. Let's assume you have 500 workstations. You'll need to apply security updates to IE every 2 months on average, Java every 3 months and Flash every 6 months. Annually this equals about 6,000 updates. With a centralized browser you cut that number to 12 and you reduce the time it takes dramatically. The whole equation gets even more lopsided if users have decided to install Firefox or other plug-ins.  
  
Benefits:  

1.  Patching can be done quickly and efficiently. The time to mitigate a critical IE vulnerability can be done in hours/days instead of weeks/months.
  
3.  It's easier to make sure all critical applications are updated. There is a trend to exploit plug-ins instead of browsers such as java, flash ,etc. By centralizing browsing you limit the places to monitor and patch. I have seen a lot of patched IE installations get compromised through Java installs that haven't been patched in 6 months.
  
5.  You can quickly change browsers and/or disable applications based on risk. For example in the WMF case you could have forced users to use Firefox as a short term measure until you had a good fix for IE.
  
7.  In certain cases you could even use an operating system other than the users desktop OS. For example let's say you have all Windows desktops with Office you could offer Linux browsing clients with Firefox.
  
9.  By segregating the browsing you limit the exposure of your internal network to malicious code. Let's take the worst case scenario of a blended threat that exploits browsers, web servers and utilizes email for propagation. If an internal workstation is compromised via the browser vector you now have exposed your internal network to the threat. If your browsing were restricted to a machine in a segregated network (DMZ) you will have neutralized the other 2 propagation vectors through traffic filtering.
  

  
Here are some of the risk you might face:  

1.  The compromise of one users could compromise all users. Depending upon your setup what may have been an isolated spyware incident could now jeopardize the privacy of all of your users.
2.  There is increased risk of localized session hijacking, dns poisoning and other similar attacks.
3.  Application compatibility. I've seen way too many insane java applications (mainly intranet type) that require a very specific version of java to run. There will be other issues but this could be mitigated by allowing users local browser access to internal applications and terminal server access to Internet sites.  
    

I've got a few expiriments under way on a small scale to play with this idea. There are also a few Internet services that allow you to implement this idea without any of your own setup. For example [Cosmopod](http://www.cosmopod.com/) offers a free service that gives you a Linux terminal session to browse the web, read email, IM, etc. without risk to your local PC.
