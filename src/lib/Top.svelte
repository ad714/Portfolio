<script>
	import { page } from '$app/state';
	import { base } from '$app/paths';
	import { site } from '$lib/site.js';

	let { children } = $props();

	const kollamTime = () =>
		new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Kolkata' });
	let time = $state(kollamTime());

	$effect(() => {
		const timer = setInterval(() => (time = kollamTime()), 15000);
		return () => clearInterval(timer);
	});

	const current = (href) => {
		const path = page.url.pathname.replace(base, '') || '/';
		return href === '/' ? path === '/' : path.startsWith(href);
	};
</script>

<header class="band">
	<div class="wrap">
		<div class="top">
			<a class="home" href="{base}/" aria-label="{site.name}, home"><span class="mark" aria-hidden="true">{site.mark}</span><span class="clock">Kollam, <time>{time}</time> IST</span></a>
			<nav aria-label="Main">
				{#each site.nav as [label, href]}
					<a href="{base}{href}" aria-current={current(href) ? 'page' : undefined}>{label}</a>
				{/each}
			</nav>
		</div>
		{@render children()}
	</div>
</header>

<style>
	.band { background: var(--band); color: var(--band-ink); --muted: var(--band-muted); --ink: var(--band-ink); }
	.top { display: flex; flex-direction: column; gap: 10px; padding: 22px 0; font-size: 15px; color: var(--band-muted); }
	.home { display: inline-flex; align-items: baseline; gap: 10px; }
	.mark { font: 700 20px/1 Manjari, sans-serif; color: var(--band-ink); }
	nav { display: flex; flex-wrap: wrap; gap: 4px 18px; }
	nav a { padding: 4px 0; transition: color 200ms var(--ease); }
	nav a:hover { color: var(--band-ink); }
	nav a[aria-current] { color: var(--band-ink); font-weight: 700; }
	@media (min-width: 720px) {
		.top { flex-direction: row; justify-content: space-between; align-items: center; padding: 26px 0; }
	}
</style>
