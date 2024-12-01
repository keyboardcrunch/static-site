---
title: DOS by Syncthing and Tailscale
short_title: The Accidental DOS
date: "2024-12-01T13:54:54.112Z"
description: When mismanaging my tailscale network led to firewall alerts and syncthing data leaks.
draft: false
---

# Denial of Service by Syncthing and Tailscale

It's just after 10:30PM on Saturday night and I'm starting to wind down as my phone dings; A large bandwidth notice my 
network firewall alerting me that my desktop has sent 80+ Gb of data to... some semi-familiar IP on my ISP.

First things first, let's block the destination IP at the firewall then start to review information about the source and
 destination, then try to identify the service by the ports; It's UDP traffic, 41641 and 15019, doesn't make much sense 
yet. Let's pivot to the desktop; run some route, netstat, and nslookup commands and I can see that Tailscale is associated 
to the traffic, that's really odd, I wonder if someone got access to my tailnet. It's been going on for... hours, _at up
to 4Gbps_.

I have a fairly dense ACL configuration for my tailnet to seperate public and internal web services isolated while still
allowing for taildrop and tailscale ssh, I'm confident it's not my ACL but I do some simplification and remove things I'm
not leveraging but built in (family sharing). I don't see anything in my Tailscale admin console to understand things, so
I pivot back to my network firewall to look for anything else on network. Bingo, "large" traffic to 172.19.0.1, that's
also probably tailscale but which host?

Pivoting back to Tailscale admin console, I click through every host starting from the top. For each endpoint I glance at
the 'endpoints' section hoping to see 172.19.0.1, it's my NAS. I sit back and think a bit, these two systems only talk
for NFS (over LAN) and syncthing (LAN & Tailscale), so there's another syncthing reference! "Click"... welllll fuckk.
There are 5 delinquent devices on my Tailnet, 3 marked for keys not to expire, and all of them reference this ISP IP under
the "endpoints" despite not being active in 6-14 months. Usually those clear out until a route is established, but they're
not important so I delete them. 

While watching and waiting for the blocks at the firewall stop, I check a few _sources_ and confirm, the destination IP 
was my previous home IP. Now that the leak of encrypted data is resolved, it's a good time to review my syncthing 
configuration, which is also non-standard; Every machine in my syncthing network has NAT traversal, global discover, and 
global servers disabled, and each endpoint is defined directly by their LAN and Tailscale IP to allow for local or remote 
connectivity without TUN/TAP. TLDR there was some clean-up to be done, old Tailscale addresses, some LAN addresses that I 
needed to pin as static in my router.

<div style="border: 3px solid #444; padding: 1rem; margin: 2rem 0;">
<h2>Spoiler</h2>
<p>
A combination of delinquent/offline Tailscale nodes holding on to "endpoint" nodes, specifically the previous IP from
my ISP, and Syncthing nodes configured to leverage my tailscale network, led to A LOT of UDP data being sent to the
wrong destination.
</p>
</div>
