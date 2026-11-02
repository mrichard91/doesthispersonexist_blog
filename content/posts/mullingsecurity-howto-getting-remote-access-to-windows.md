---
title: 'Howto: Getting Remote Access to Windows Behind a Firewall'
date: '2006-01-03'
description: >-
  There are several services available to get remote access to your Windows PC
  such as gotomypc.com, logmein.com and many others.
category: archive
tags:
  - mullingsecurity
  - security
source: >-
  http://www.mullingsecurity.com/2006/01/howto-getting-remote-access-to-windows.html
sourceName: Mulling Security
---
There are several services available to get remote access to your Windows PC such as gotomypc.com, logmein.com and many others. As a security administrator your job is probably to keep people from using these unauthorized tools and stick to the authorized ones such as your corporate VPN. Many of these services are trivial to block or detect with the right tools like a proxy server, firewall and IDS.  
  
What happens when somebody \*\*really\*\* wants remote access but not through the normal channels. Maybe you're a consultant working a job where it would be nice to do some work remotely but the company won't give you remote access. Maybe you need a backup to your authorized VPN connectivity in case it goes down? Maybe you're a security admin trying to make sure your users can't do this.  
  
I'm going to describe just one of the many ways I've seen users try to bypass access controls to get remote access. In this case the user is getting Remote Desktop Protocol (RDP) access to their work machine from home. No doubt about it RDP is a nice method of remote access, you get all the benefits of your desktop without having to be there. Most remote access systems limit you to specific applications or servers but your desktop opens the whole world to you.  
  
Most semi-competent security administrators will have you locked up with a couple of restrictions that can make this a trial and error event. Here are a few of the obstacles you might encounter:  
  
1) Firewalls that only permit specific ports outbound. Usually you can have good luck with http, https, ftp, dns and other standard ports. A good security admin might have these locked down really tight in which case https might be your only choice.  
  
2) Application proxys that enforce protocols. Usually you'll find these protecting http, ftp, dns and stmp. SSH won't natively run if the protocol is being validated but you could wrap it in another utility like httptunnel or stunnel for protocol compliance.  
  
3) IDS can detect abnormal use of ssh and give you away. This is a good reason to use a protocol wrapper like stunnel to keep your traffic from kicking up an alert. Be careful about using ssh on ports like 21 where Snort will detect ssh as an FTP buffer overflow. The IDS will also pose a problem when looking for open ports, it may detect you scanning while trying to find an open port.  
  
Let's start with what you need: 1 Windows XP workstation with RDP enabled (HOST), one SSH client like PuTTY or the openssh client in cygwin, 1 ssh server (RELAY) running somewhere on the Internet and one workstation with an RDP client (CLIENT).  
  
Note: I'm not going to explain how to use SSH, RDP or any other application. If you're not already familar with them you probably shouldn't be trying to illicitly access the machine behind the firewall.  
  
1) Determine what ports (PORT) are open through the firewall from HOST to RELAY. Creative use of netcat on HOST and tcpdump on RELAY make this pretty easy. Don't scan too fast or too much, remember you don't want to trip the IDS.  
  
2) Setup the RELAY sshd daemon to accept connections on PORT. If you're going to wrap SSH in another protocol like SSL now is the time to setup your wrapper too.  
  
3) Setup the putty client on HOST to forward 3389 to the RELAY on some arbitrary port that you found in step 1 and configured in step 2. Example: "ssh -p 443 -R 3388:localhost:3389 user@RELAY"  
  
4) You should now be able to RDP to HOST from RELAY assuming you have an RDP client on RELAY. Simply use "localhost" or "127.0.0.1" in your RDP client. If you would like to use a CLIENT machine keep reading.  
  
5) On RELAY setup the ssh client to accept connections on the ethernet interface for 3389. By default SSH listens on loopback only so you'll have to explicity list the IP address of your ethernet interface. Example "ssh -L 192.168.1.1:3389:localhost:3388 user@RELAY"  
  
6) Use your RDP client on CLIENT to connect to the IP address of RELAY.  
  
Enjoy!
