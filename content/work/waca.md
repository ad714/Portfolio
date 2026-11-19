---
title: WACA, TACA and Eden
rank: 3
dates: Feb 2026 to now
role: personal, for the OCL cricket community
proof: Live
proofLabel: TACA umpires on Telegram
headline: Digit cricket, umpired by a bot.
line: Kerala's OCL groups play cricket with two numbers per ball. TACA umpires the match inside Telegram and Eden keeps every scorecard, stat and leaderboard.
stack: Python, FastAPI, SQLite, Telegram Bot API, WhatsApp Cloud API, React
links:
  - label: Play TACA on Telegram
    href: https://t.me/ocl_umpire_bot
---

## The game

OCL digit cricket is played in chat groups. The bowler and the batter each pick a number. If they match, the batter is out. If not, the batter's number is the runs. Every ball used to wait on a human scorekeeper doing the sums, and every group filled up with people asking for the score.

## WACA

WACA started as a WhatsApp umpire bot. WhatsApp's official API cannot post into groups, and no unofficial client is safe from bans, so WACA was built DM only: it talks to each player privately and a human umpire relays the result to the group. It runs tosses, innings, overs, timeouts and substitutions, and keeps a live public scoreboard with names only, never phone numbers.

## TACA

TACA moves the game to Telegram, where a bot can run the whole match inside the group. Play solo, challenge a friend one on one, or run a full group match, with both numbers kept blind until the ball resolves, so nobody can argue with the result.

## Eden

Eden is the web app for the community: matches, stats, leaderboards and full scorecards, with sign in through Telegram.
