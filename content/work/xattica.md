---
title: Xattica Gaming Zone
rank: 2
dates: Sep 2026 to now
role: client, full stack and mobile
proof: '3'
proofLabel: branches run on it
headline: Live on Google Play and the web.
line: The app and website a gaming venue chain runs its floor on, rebuilt from one Expo codebase.
stack: React Native, Expo, Supabase, Cloudflare Workers, Firebase Cloud Messaging, Sentry
links:
  - label: xatticagaming.win
    href: https://xatticagaming.win
---

## The job

Xattica runs gaming venues in Kollam, Kottayam and Cochin. I took over their Android app from the founder and rebuilt it in React Native and Expo, so one codebase now ships the Play Store app and the website.

## What staff and players get

Players see the live floor: which PCs, sims and consoles are free, the rates, rush hours and deals. Staff run sessions, bookings, drinks and billing from the same app, with push notifications when a rig frees up and an update prompt when a new build lands.

## Moving a live system without stopping it

The old app and the new one shared one Supabase database for weeks. Old installs on wrong phone clocks were reviving sessions that had already been billed. I fixed it in the database: triggers that refuse to bring a billed session back, then strict Row Level Security once every staff phone was on the new build.

## Shipping

Releases go out through Play testing tracks with Sentry source maps uploaded, and the website deploys to a Cloudflare Worker from the same branch.
