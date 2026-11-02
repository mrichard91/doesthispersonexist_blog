---
title: Captchas to defeat SSH brute force attacks
date: '2006-03-14'
publishedAt: '2006-03-14T16:06:00-05:00'
description: >-
  In between the 6,000 ssh brute force attacks I receive everyday I try to come
  up with some clever countermeasure.
category: archive
tags:
  - mullingsecurity
  - security
source: 'http://www.mullingsecurity.com/2006/03/captchas-to-defeat-ssh-brute-force.html'
sourceName: Mulling Security
---
In between the 6,000 ssh brute force attacks I receive everyday I try to come up with some clever countermeasure. It's just a passing obsession since I use key based authentication but it still nags at me.  
  
I had a conversation with a friend from RIT who mentioned that during a security competition one of his colleagues had used captchas to defeat ssh brute force attacks. As soon as I heard this suggestion I knew it was what I wanted.  
  
1 Google search and 10 minutes later I found the project he had referred to. It's a little rough on the edges but it implements several interesting captcha techniques in a pam module called pam\_captcha.  
  
You can find the project at http://www.csh.rit.edu/~psionic/projects/pam_captcha/.  
  
Basically it works like this - you attempt to login via ssh and are prompted for a username. After entering your username you must solve a randomly generated captcha. The captcha could be a simple math problem or ascii art containing a number or phrase. Either way the idea is that the information is easy for a human to deduce but difficult for a machine. Since brute force SSH attacks rely on a machine to continually guess passwords this effectively defeats the attack.
