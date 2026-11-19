<script>
	import { base } from '$app/paths';
	import Top from '$lib/Top.svelte';
	import Seo from '$lib/Seo.svelte';
	import { list, formatDate } from '$lib/content.js';

	const posts = list('writing');
</script>

<Seo title="Writing" description="Notes and essays from Arun BM on building things that run on live data." />

<Top>
	<section class="intro">
		<h1>Writing</h1>
		<p>Notes on building things that run on live data.</p>
	</section>
</Top>

<main id="main">
	<div class="wrap">
		{#if posts.length}
			<div class="wm" aria-hidden="true" style="top: 10px; right: -120px">{String(posts.length).padStart(2, '0')}</div>
			<ul class="list">
				{#each posts as post}
					<li><time datetime={post.date}>{formatDate(post.date)}</time><div><a href="{base}/writing/{post.slug}/">{post.title}</a>{#if post.aside}<span class="aside">{post.aside}</span>{/if}</div></li>
				{/each}
			</ul>
		{:else}
			<p class="empty comp">Nothing published yet. The first post is being written.</p>
		{/if}
	</div>
</main>

<style>
	.intro { padding: 36px 0 52px; }
	h1 { font: 700 clamp(2.8rem, 1.4rem + 6vw, 6rem)/0.9 var(--display); letter-spacing: -0.03em; margin-left: -0.04em; }
	.intro p { margin-top: 14px; color: var(--band-muted); }
	.list { list-style: none; padding: 0; margin-top: 48px; }
	.list li { display: grid; gap: 2px; padding: 16px 0; border-top: 1px solid var(--line); }
	.list time { font-size: 14px; color: var(--muted); }
	.list a { font-size: 1.2rem; }
	.list a:hover { text-decoration: underline; text-underline-offset: 4px; }
	.aside { display: block; color: var(--muted); font-size: 15px; }
	.empty { margin-top: 48px; padding: 26px; color: var(--muted); }
	@media (min-width: 720px) { .list li { grid-template-columns: 130px 1fr; gap: 18px; align-items: baseline; } }
</style>
