<script>
	import { base } from '$app/paths';
	import Top from '$lib/Top.svelte';
	import Seo from '$lib/Seo.svelte';
	import { list, formatDate } from '$lib/content.js';

	const kinds = [['all', 'All'], ['film', 'Films'], ['food', 'Food'], ['match', 'Cricket'], ['note', 'Notes']];
	const perMonth = {};
	const entries = list('log')
		.reverse()
		.map((entry) => {
			const month = entry.date.slice(0, 7);
			perMonth[month] = (perMonth[month] ?? 0) + 1;
			return { ...entry, ball: `${month.slice(2, 4)}.${Number(month.slice(5))}.${perMonth[month]}` };
		})
		.reverse();

	const over = Array.from({ length: 6 }, (_, i) => entries.slice(0, 6).reverse()[i]);
	let picked = $state(over.findLastIndex(Boolean));
	let kind = $state('all');
	const shown = $derived(kind === 'all' ? entries : entries.filter((entry) => entry.kind === kind));
	const current = $derived(over[picked]);
</script>

<Seo title="Log" description="Films, food, cricket and passing notes from Arun BM, scored ball by ball." />

<svg width="0" height="0" style="position: absolute" aria-hidden="true">
	<symbol id="g-film" viewBox="0 0 24 24"><rect x="4" y="5" width="16" height="14" rx="1.5" /><path d="M8 5v14M16 5v14M4 9h4M4 15h4M16 9h4M16 15h4" /></symbol>
	<symbol id="g-food" viewBox="0 0 24 24"><path d="M3 15c4-8 12-11 18-11-1 7-6 14-15 14z" /><path d="M6 18c3-4 7-8 12-11M10 13l-1-3M13 11l2 2" /></symbol>
	<symbol id="g-match" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8" /><path d="M7 6c2 4 2 8 0 12M17 6c-2 4-2 8 0 12" /></symbol>
	<symbol id="g-note" viewBox="0 0 24 24"><path d="M7 12h10" /></symbol>
</svg>

<Top>
	<section class="intro">
		<h1>Log</h1>
		<p>Everything off the keyboard, scored as it happens: films, food, matches and passing thoughts.</p>
	</section>
</Top>

<main id="main">
	<div class="wrap">
		{#if current}<div class="wm" aria-hidden="true" style="top: 0; right: -120px">{current.ball.slice(3)}</div>{/if}
		<section class="over" aria-label="This over, the latest six entries">
			<div class="meta"><span>This over</span>{#if current}<span>{formatDate(current.date).slice(3)}</span>{/if}</div>
			<div class="balls">
				{#each over as entry, i}
					{#if entry}
						<button class="ball" class:on={i === picked} aria-pressed={i === picked} aria-label="Ball {i + 1}, {entry.kind}: {entry.title}" onclick={() => (picked = i)}>
							<svg><use href="#g-{entry.kind}" /></svg><span class="n" aria-hidden="true">.{i + 1}</span>
						</button>
					{:else}
						<span class="ball empty" aria-hidden="true"><span class="n">.{i + 1}</span></span>
					{/if}
				{/each}
			</div>
			{#key picked}
				<p class="comm inv">
					{#if current}
						<small>{current.ball}, {current.kind}, {formatDate(current.date)}</small>
						<a href="{base}/log/{current.slug}/">{current.title}{#if current.aside}. <span>{current.aside}</span>{/if}</a>
					{:else}
						<small>Over 1</small>No balls bowled yet. The first entry lands soon.
					{/if}
				</p>
			{/key}
		</section>

		{#if entries.length}
			<div class="filter" role="group" aria-label="Show">
				{#each kinds as [value, label]}
					<button aria-pressed={kind === value} onclick={() => (kind = value)}>{label}</button>
				{/each}
			</div>
			<ul class="card">
				{#each shown as entry}
					<li><span class="b">{entry.ball.slice(3)}</span><span class="k">{entry.kind}</span><div><a href="{base}/log/{entry.slug}/">{entry.title}</a>{#if entry.aside}<span class="aside">{entry.aside}</span>{/if}</div></li>
				{/each}
			</ul>
		{/if}
	</div>
</main>

<style>
	.intro { padding: 36px 0 52px; }
	h1 { font: 700 clamp(2.8rem, 1.4rem + 6vw, 6rem)/0.9 var(--display); letter-spacing: -0.03em; margin-left: -0.04em; }
	.intro p { margin-top: 14px; color: var(--band-muted); max-width: 44ch; }
	.over { margin-top: 48px; }
	.meta { display: flex; justify-content: space-between; font-size: 14px; color: var(--muted); margin-bottom: 10px; }
	.balls { display: grid; grid-template-columns: repeat(6, 1fr); gap: 7px; padding-bottom: 26px; }
	.ball { position: relative; aspect-ratio: 1; max-width: 120px; border-radius: 50%; border: 0; padding: 0; background: var(--comp); color: var(--ink); display: grid; place-items: center; cursor: pointer; transition: background-color 150ms var(--ease), color 150ms var(--ease); }
	:global(.night) .ball { outline: 1px solid var(--line); outline-offset: -1px; }
	.ball:hover { background: var(--comp-hover); }
	.ball.on { background: var(--ink); color: var(--ground); }
	.ball.empty { cursor: default; background: transparent; outline: 1.5px dashed var(--muted); outline-offset: -1.5px; opacity: 0.6; }
	.ball svg { width: 46%; height: 46%; stroke: currentColor; fill: none; stroke-width: 1.6; stroke-linecap: round; stroke-linejoin: round; }
	.n { position: absolute; bottom: -24px; left: 50%; translate: -50% 0; font-size: 13px; color: var(--muted); }
	.comm { margin-top: 20px; padding: 22px 24px; font: 500 clamp(1.2rem, 1rem + 0.8vw, 1.55rem)/1.3 var(--display); animation: flip 260ms var(--ease); }
	.comm small { display: block; font: 400 14px var(--text); color: var(--muted); margin-bottom: 6px; }
	.comm a span { color: var(--muted); }
	.comm a:hover { text-decoration: underline; text-underline-offset: 4px; }
	@keyframes flip { from { translate: 0 6px; opacity: 0.4; } }
	.filter { display: flex; flex-wrap: wrap; gap: 4px 20px; margin: 72px 0 14px; }
	.filter button { background: none; border: 0; padding: 6px 0; font: inherit; font-size: 15px; color: var(--muted); cursor: pointer; }
	.filter button:hover { color: var(--ink); }
	.filter button[aria-pressed='true'] { color: var(--ink); font-weight: 700; }
	.card { list-style: none; padding: 0; }
	.card li { display: grid; grid-template-columns: 52px 1fr; gap: 4px 12px; padding: 14px 0; border-top: 1px solid var(--line); align-items: baseline; }
	.card .k { grid-column: 2; grid-row: 1; font-size: 14px; color: var(--muted); }
	.card li > div { grid-column: 2; }
	.card .b { font-weight: 700; font-size: 15px; }
	.card a { font-size: 1.12rem; }
	.card a:hover { text-decoration: underline; text-underline-offset: 4px; }
	.aside { display: block; color: var(--muted); font-size: 15px; }
	@media (min-width: 720px) {
		.balls { gap: 10px; }
		.card li { grid-template-columns: 64px 90px 1fr; gap: 16px; }
		.card .k, .card li > div { grid-column: auto; grid-row: auto; }
	}
</style>
