---
title: 'New Gmail Feature: False Security'
date: '2005-12-01'
description: On Wednesday Google added virus scanning to their gmail service.
category: archive
tags:
  - mullingsecurity
  - security
source: 'http://www.mullingsecurity.com/2005/12/new-gmail-feature-false-security.html'
sourceName: Mulling Security
---
On Wednesday [Google added virus scanning](http://mail.google.com/support/bin/answer.py?answer=25760) to their gmail service. Despite the title I think that this is a good idea. I don't think anyone would reasonably argue that scanning incoming and outgoing email for known viruses is a bad idea.  
  
Where I'm really going here is that adding virus scanning only makes users safer from old viruses but it doesn't help nearly as much with new viruses. Anti-virus products scan files for known virus signatures. This model works great when you can easily catalogue all known viruses and create 100% reliable signatures that can be used to detect them.  
  
Now that Google has added virus scanning users may be led to believe that they are protected from all email viruses but that's not true. With almost all new viruses, except those that are nearly identical to an existing one, there is a time between when the virus is released and when the signature to detect it is released. This time delta represents a window of exposure for users during which time the attachment will not be blocked and they can become infected.  
  
Unfortunately the best answer to this problem, assuming that you can't trust users to make good decisions, is to preemptively block the attack vector. In the case of most new viruses, such as the Sober family of mass mailers, they are using certain attachment types to propagate. Blocking all .zip, .gz, .Z, .com, .exe, .pif, .scr, etc attachments will prevent 99.9% of new and unknown mass mailing viruses. The problem with this solution is that a lot of users rely on sending zip and other archive files and most providers aren’t willing to be that Draconian.  
  
So even though Google's looking out for your Gmail account, don't let your guard down.
