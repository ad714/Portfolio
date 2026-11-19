---
title: PlayON
rank: 1
dates: Jun to Jul 2026
role: built and run alone
proof: '271'
proofLabel: players, 104 fixtures
headline: 21,506 predictions, 94k page views.
line: A FIFA World Cup 2026 prediction game I designed, shipped and operated alone for the whole tournament.
stack: React 19, React Router 7, Vite, Supabase (Postgres, RLS, Deno Edge Functions), Vercel
links:
  - label: Final standings
    href: https://play-on-xi.vercel.app
---

## What it was

PlayON was a community prediction game for the 2026 World Cup. 271 players predicted every one of the 104 fixtures, logged 21,506 match predictions and answered 37,712 daily quiz questions. The site took 94k page views over the tournament. I built it, shipped it and ran it alone, from the first group game to the final.

## Six games, one scoring engine

Players picked scorelines and results, group qualifiers, tournament outcomes before the knockouts, daily predictions and fantasy picks. All six modes score through one Postgres function, `recompute_scores()`. A `pg_cron` heartbeat runs it after each fixture sync, which a Deno Edge Function pulls in.

## Rules enforced in the database

Deadlines and prediction privacy live in Row Level Security and `SECURITY DEFINER` RPCs, not in the client. Nobody could see how the crowd had picked a match until kickoff, so nobody could copy the crowd.

## No budget for a live sports API

A paid live feed was out of reach. A browser userscript scraped in-play match pages and posted results into the app, so fantasy standings moved during the match, not after it.

## After the final

The tournament is over and the standings are final. The site now serves a static snapshot of the final table, so nothing runs that does not need to.
