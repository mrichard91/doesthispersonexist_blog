---
title: PHP Email Injection
date: '2005-12-12'
description: >-
  SecurePHP is carrying an article on email injection in the php mail()
  function.
category: archive
tags:
  - mullingsecurity
  - security
source: 'http://www.mullingsecurity.com/2005/12/php-email-injection.html'
sourceName: Mulling Security
---
SecurePHP is carrying an [article on email injection](http://securephp.damonkohler.com/index.php/Email_Injection) in the php mail() function. Just another great example of why it's bad to take input from a user and pass it directly into a function.  
  

> There are a lot of ways to send anonymous emails, some use it to mass mail, some use it to spoof identity, and some (a few) use it to send email anonymously. Usually a web mailform using the mail() function generates emails containing headers with the originating IP of the server it's running on. Therefore the mailform acts as a SMTP proxy. The input fields of the form may vary, but it is common to specify a mailform that gives you control over the subject, the message, and the sender's email address.
