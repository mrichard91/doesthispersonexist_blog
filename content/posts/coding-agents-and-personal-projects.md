---
title: "Coding agents and personal projects"
date: "2026-11-12"
description: "A few personal projects that coding agents made feasible, from an iMac display to minimal messaging clients and security tools."
category: projects
tags: [coding-agents, open-source, tools]
---

Coding agents unlock a new world of personal projects, things that would not have been feasible in the age of writing software from scratch. I’m thinking mostly of the kind of ambitious projects that require taking an existing open source project, understanding it and integrating it into something new that is tailored to my interests or needs. These kinds of projects previously might have taken months; now they can be done in less than a day, with $100–$200 a month in AI subscription fees.

Some projects I’ve built recently:

**A second life for a 2020 iMac.** Running Ubuntu, it doubles as a second display for my laptop over Thunderbolt or Wi-Fi, and a full-screen, motion-activated dashboard I call dayboard. The dashboard brings together weather, radar, running stats and Rivian data. A Cloudflare Tunnel and an iOS version let me pull the same information from the iMac elsewhere. It automatically switches between display and dashboard duties. Code: [display sender](https://github.com/mrichard91/imac-display-sender) and [receiver](https://github.com/mrichard91/imac-display-receiver).

[![The iMac display sender’s menu bar controls](/media/personal-projects/imac-display.png)](/media/personal-projects/imac-display.png)

**Custom firmware and a client for the [JetKVM Mini](https://jetkvm.com/products/jetkvm-mini).** I rewrote several parts in Rust for memory safety and removed the cloud update and login integrations so I can manage it locally. I also added the ability to relay my host YubiKey to the remote computer for passkey authentication, and attach a local directory as removable media on the remote device.

**isyeet.io, “I send you E2E text.”** A prototype text-only messaging platform based on libsignal, with iOS, macOS and CLI clients. It only accepts ASCII characters and keeps a minimal footprint, with a server hosted on Cloudflare to relay encrypted messages. The [ASCII messaging manifesto](https://isyeet.io/manifesto/) explains the idea.

**A full audit of my Synology NAS.** Turns out malware scanning can itself be a pretty potent potential backdoor. I wrote up the details in my [Synology Wedjat/DLID analysis](https://github.com/mrichard91/on_analysis/blob/main/cti/malware_analysis/synology-wedjat-dlid-analysis.md).

**A [minimal macOS Keybase client](https://github.com/mrichard91/keybase-osx-native-minimalist).** A native, text-only interface using a reduced version of the official Keybase backend. The idea is to keep messaging while reducing the attack surface of running a browser engine to read text. No rich media, attachments or link previews.

[![Keybase Minimal showing fictional conversations in its offline demo](/media/personal-projects/keybase-minimal.jpg)](/media/personal-projects/keybase-minimal.jpg)

**[Rivian TUI](https://github.com/mrichard91/rivian-tui).** A terminal interface using Rivian’s GraphQL backend to check status and track stats on my Rivian. It also serves as the backend for other projects, including dayboard, to access charge state and software update information.

[![Rivian TUI showing vehicle status and charge information](/media/personal-projects/rivian-tui.png)](/media/personal-projects/rivian-tui.png)

**[bluemon-tui](https://github.com/mrichard91/bluemon-tui).** Monitor nearby Bluetooth devices, log them to a database and analyze patterns over time. I use it as another input to a security system, looking for devices that linger or return, including Bluetooth signals from cars and drones.

**A [Go binary strings extractor](https://github.com/mrichard91/go_strings_extractor).** Extract usable strings from Go binaries using pure Python to disassemble code, analyze it and find string references. It helps separate strings used by the program from the noise of the Go runtime, without needing an external disassembler.

**[pnpm-rs](https://github.com/mrichard91/pnpm-rs).** A limited pnpm replacement written in Rust, with built-in security scanning. It scans packages with YARA and looks for known bad patterns, then lets me fan out across packages from the same maintainers and other registry metadata. It also skips install scripts, which is useful when looking at packages I don’t trust.
