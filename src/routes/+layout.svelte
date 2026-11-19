<script>
	import '../app.css';
	import { base } from '$app/paths';
	import { site, live } from '$lib/site.js';

	const feed = live.writing || live.log;

	let { children } = $props();
</script>

<svelte:head>
	{#if feed}<link rel="alternate" type="application/rss+xml" title="{site.name}" href="{base}/rss.xml" />{/if}
</svelte:head>

<a class="skip" href="#main">Skip to content</a>
{@render children()}
<footer>
	<div class="wrap">
		<h2>Say hello</h2>
		<a class="mail" href="mailto:{site.email}">{site.email}</a>
		<nav aria-label="Elsewhere">
			{#each site.links as [label, href]}
				<a {href}>{label}</a>
			{/each}
			{#if feed}<a href="{base}/rss.xml">RSS</a>{/if}
		</nav>
	</div>
</footer>

<style>
	footer { margin-top: auto; background: var(--band); color: var(--band-muted); --ink: var(--band-ink); }
	footer .wrap { padding-top: 56px; padding-bottom: 48px; }
	h2 { font: 400 15px var(--text); }
	.mail { display: inline-block; margin-top: 10px; font: 700 clamp(1.1rem, 0.4rem + 3.6vw, 3.4rem)/1.05 var(--display); letter-spacing: -0.02em; color: var(--band-ink); overflow-wrap: anywhere; transition: translate 200ms var(--ease); }
	.mail:hover { translate: 4px 0; }
	nav { display: flex; flex-wrap: wrap; gap: 6px 24px; margin-top: 28px; font-size: 15px; }
	nav a { padding: 4px 0; transition: color 200ms var(--ease); }
	nav a:hover { color: var(--band-ink); }
	:global(main) { padding-bottom: 110px; }
</style>
