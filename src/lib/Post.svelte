<script>
	import { base } from '$app/paths';
	import Top from '$lib/Top.svelte';
	import Seo from '$lib/Seo.svelte';
	import { formatDate } from '$lib/content.js';

	let { post, back, label } = $props();
</script>

<Seo title={post.title} description={post.aside} />

<Top>
	<section class="intro">
		<p class="meta"><time datetime={post.date}>{formatDate(post.date)}</time>{#if post.kind}, {post.kind}{/if}</p>
		<h1>{post.title}</h1>
		{#if post.aside}<p class="aside">{post.aside}</p>{/if}
	</section>
</Top>

<main id="main">
	<div class="wrap">
		<article class="prose"><post.component /></article>
		<a class="more" href="{base}{back}">{label}</a>
	</div>
</main>

<style>
	.intro { padding: 36px 0 52px; }
	.meta { color: var(--band-muted); font-size: 15px; }
	h1 { font: 700 clamp(2.2rem, 1.3rem + 4vw, 4.4rem)/0.98 var(--display); letter-spacing: -0.02em; margin-top: 10px; max-width: 18ch; }
	.aside { margin-top: 14px; color: var(--band-muted); font-size: 1.1rem; }
	article { margin-top: 56px; }
	.more { margin-top: 56px; }
</style>
