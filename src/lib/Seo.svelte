<script>
	import { page } from '$app/state';
	import { base } from '$app/paths';
	import { site } from '$lib/site.js';

	let { title, description = site.description } = $props();
	const full = $derived(title ? `${title} | ${site.name}` : `${site.name}, full-stack developer`);
	const canonical = $derived(site.url + page.url.pathname.slice(base.length));
</script>

<svelte:head>
	<title>{full}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={canonical} />
	<meta property="og:type" content="website" />
	<meta property="og:url" content={canonical} />
	<meta property="og:title" content={full} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content="{site.url}/og.png" />
	<meta name="twitter:card" content="summary_large_image" />
</svelte:head>
