---
title: Virtualizing buffer overflows
date: '2005-11-30'
description: >-
  Exploring the security implications of a virtualization host’s ability to
  modify a guest’s memory and execution.
category: archive
tags:
  - mullingsecurity
  - security
  - virtualization
source: 'http://www.mullingsecurity.com/2005/11/virtualizing-buffer-overflows.html'
sourceName: Mulling Security
---
When you're done reading be sure to check out the update [here.](/posts/mullingsecurity-update-on-virtualizing-overflows/)  
  
Most people are familiar with the traditional overflow exploit methodology - find a condition where more data is sent to a buffer than the buffer can handle and gain control of program execution. With new protections against buffer overflows popping up (Stackguard, propolice, XP SP2) and better OS level protections such as randomized entry points we might be tempted to think that we're almost at the end of the road.  
  
There's a new trend in IT that could bring buffer overflows back. Virtualization is really starting to take hold everywhere from enterprise datacenters to the desktop. In and of itself this probably isn't news to anyone nor is it necessarily very interesting. What is interesting is how virtualization might lead to a new type of buffer overflow attack.  
  
Let's think about how a product like [Vmware](http://www.vmware.com/) works. At its most basic level Vmware works by creating a virtual hardware environment including virtualized cpu, memory, disk and IO devices. Vmware offers fault tolerance and reliability by insuring that no guest operating system will have access to the resources of another guest or the host.  
  
What Vmware and most other virtualization technologies don't seem to do is offer a lot of protections against the host modifying the virtual machines. From a design perspective this makes sense, the host needs the ability to manage and control the virtual machines and control their virtual hardware.  
  
Putting this information into the context of buffer overflows - what if the host could modify the execution stream of a virtual machine to covertly run code? This doesn't have to happen through a buffer overflow, though that might be a fairly reliable way. Said another way, what are the implications of the host being able to modify memory and change code execution of guest virtual machines?  
  
Think about it - the possibilities are limitless. The host could patch the running kernel by directly modifying memory on the guest. Filesystem access could be filtered at the hardware level to defeat most host based security checks. The best part about all of this is that no anti-virus or host intrusion prevention product would have a chance at detecting this. With this type of power you could create a virtual rootkit that was completely undetectable to the guest.  
  
The reason this type of host modification should be scary is that the host is assumed to be a trusted device. Just like we trust that the motherboard and BIOS in our PC hasn't been trojaned the guest virtual machines trust the host. This seems rational but there are cases where you have secured virtual machines running on untrusted hosts. For example virtual dedicated hosting is becoming an inexpensive option through service providers such as [Redwood Virtual.](http://www.redwoodvirtual.com/)  
  
There has been some work to address issues with virtual machine security. For example [IBM's secure Hypervisor](http://www.research.ibm.com/secure_systems_department/projects/hypervisor/) for the Xen virtualization tool provides some level of integrity checking for the hypervisor and the virtual machines. Here is a snippet from their documentation:  
  

> **Attestation and integrity guarantees for the hypervisor and its virtual machines.**  
> We are extending the Trusted Computing Group (TCG) specification to include hypervisor-based server platforms. Our goal here is secure boot or authenticated boot code guarantees for the hypervisor platform, Virtual Machines, and optionally the guest operating systems and applications running on Virtual Machines. To support a large number of Virtual Machines, we have developed a [virtual TPM architecture](http://www.research.ibm.com/secure_systems_department/projects/vtpm/index.html) which we have applied to the Xen open-source hypervisor.

  
  
The bottom line is that all new technologies introduce security challenges and I think we're on the verge of seeing virtualization security problems hit center stage.
