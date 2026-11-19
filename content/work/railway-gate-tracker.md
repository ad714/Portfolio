---
title: Railway Gate Tracker
rank: 4
dates: 2025 to now
role: personal
proof: V1
proofLabel: working prototype, July 2025
headline: Which level crossing on your route is about to close.
line: A problem almost nobody builds for. RGT tells a driver which level crossings on their route a train is about to close, before they reach the queue.
stack: Expo, Flask, Google Maps, live train data
video: rgt-v1-demo.webm
poster: rgt-v1-poster.jpg
videoLabel: Railway Gate Tracker V1 on a phone. A route is drawn on the map from origin to destination and the level crossings along it appear as numbered red markers.
links:
  - label: Watch the V1 demo
    href: https://www.youtube.com/watch?v=m5nCfLbq-6Q
  - label: V1 source
    href: https://github.com/ad714/Railway_Gate_Tracker_RGT
---

## The idea

Everyone who drives in Kerala knows the wait at a closed level crossing. Train timings are public, road routes are public, and the crossings sit exactly where the two meet. Almost nothing connects them. RGT does: it looks at your route, finds every level crossing on it, and tells you which ones a train is about to close, so you can take another road before you are stuck in the queue.

## V1 worked

V1 drew the route, marked every crossing on it and checked live train data for each one. The video is that prototype running on a phone, recorded in July 2025.

## What comes next

A React Native version is in progress, built on what V1 proved.
