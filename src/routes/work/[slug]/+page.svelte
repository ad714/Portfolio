<script>
	import { base, assets } from '$app/paths';
	import Top from '$lib/Top.svelte';
	import Seo from '$lib/Seo.svelte';
	import { find } from '$lib/content.js';

	let { data } = $props();
	const project = $derived(find('work', data.slug));
</script>

<Seo title={project.title} description={project.line} />

<Top>
	<section class="intro">
		<p class="meta">{project.dates}, {project.role}</p>
		<h1>{project.title}</h1>
		<p class="line">{project.line}</p>
	</section>
</Top>

<main id="main">
	<div class="wrap">
		<div class="wm small" aria-hidden="true">{project.proof}</div>
		<div class="facts">
			<div class="inv proof"><span class="n">{project.proof}</span><span>{project.proofLabel}</span></div>
			<div class="comp side">
				<p><b>{project.headline}</b></p>
				<p class="stack">{project.stack}</p>
				{#if project.links?.length}
					<p class="links">{#each project.links as link}<a href={link.href}>{link.label}</a>{/each}</p>
				{/if}
			</div>
		</div>

		{#if project.video}
			<video class="media" src="{assets}/media/{project.video}" poster="{assets}/media/{project.poster}" muted loop playsinline controls preload="metadata" aria-label={project.videoLabel}></video>
		{/if}

		<article class="prose">
			<project.component />
		</article>

		<a class="next comp" href="{base}/work/{data.next.slug}/"><span>Next in the top order</span><b>{data.next.title}</b></a>
	</div>
</main>

<style>
	.intro { padding: 36px 0 52px; }
	.wm.small { top: 20px; right: -200px; font-size: clamp(10rem, 30vw, 24rem); }
	.meta { color: var(--band-muted); font-size: 15px; }
	h1 { font: 700 clamp(2.8rem, 1.2rem + 7vw, 6.4rem)/0.9 var(--display); letter-spacing: -0.03em; margin: 10px 0 0 -0.04em; }
	.line { margin-top: 18px; max-width: 46ch; color: var(--band-muted); font-size: 1.1rem; }
	.facts { display: grid; gap: 12px; margin-top: 48px; }
	.proof { padding: 24px; display: flex; flex-direction: column; gap: 6px; color: var(--muted); }
	.proof .n { font: 700 clamp(3.4rem, 2.4rem + 4vw, 5.6rem)/0.9 var(--display); color: #fff; }
	.side { padding: 24px; display: grid; gap: 10px; align-content: start; }
	.side b { font-weight: 500; font-size: 1.15rem; }
	.stack { color: var(--muted); font-size: 15px; }
	.links { display: flex; flex-wrap: wrap; gap: 6px 20px; }
	.links a { font-weight: 500; text-decoration: underline; text-underline-offset: 4px; }
	.links a:hover { text-decoration-thickness: 2px; }
	.media { width: 100%; max-width: 380px; margin-top: 40px; border-radius: 4px; background: #000; }
	.prose { margin-top: 48px; }
	.next { display: grid; gap: 4px; margin-top: 80px; padding: 22px 24px; transition: background-color 200ms var(--ease); }
	.next:hover { background: var(--comp-hover); }
	.next span { color: var(--muted); font-size: 15px; }
	.next b { font: 500 1.6rem var(--display); transition: translate 200ms var(--ease); }
	.next:hover b { translate: 4px 0; }
	@media (min-width: 720px) {
		.facts { grid-template-columns: 5fr 7fr; gap: 24px; }
	}
</style>
