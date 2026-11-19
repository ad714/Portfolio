<script>
	import { page } from '$app/state';
	import { base } from '$app/paths';
	import Top from '$lib/Top.svelte';
	import Seo from '$lib/Seo.svelte';
</script>

<Seo title={page.status === 404 ? 'Not found' : 'Error'} />

<Top>
	<section class="intro">
		<h1>{page.status === 404 ? 'Torn ticket.' : 'Something broke.'}</h1>
		<p>{page.status === 404 ? 'This page is not on the list. It may have moved.' : page.error?.message}</p>
	</section>
</Top>

<main id="main">
	<div class="wrap">
		<div class="wm" aria-hidden="true" style="top: 0; right: -80px">{page.status}</div>
		<a class="more" href="{base}/">Back to the index</a>
	</div>
</main>

<style>
	.intro { padding: 36px 0 52px; }
	h1 { font: 700 clamp(2.6rem, 1.4rem + 5vw, 5.4rem)/0.95 var(--display); letter-spacing: -0.03em; }
	.intro p { margin-top: 14px; color: var(--band-muted); }
	.wrap { min-height: 360px; padding-top: 32px; }
</style>
