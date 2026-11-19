<script>
	import { assets } from '$app/paths';
	import Top from '$lib/Top.svelte';
	import Seo from '$lib/Seo.svelte';
	import { formatDate } from '$lib/content.js';
	import resume from '$lib/resume.json';

	const summary = resume.sections.find((s) => s.title === 'Summary').entries[0].title;
	const rest = resume.sections.filter((s) => s.title !== 'Summary');
	const pairs = (entry, split) => [entry.title, ...entry.lines].map((line) => (split ? line.split(/\s*:\s+/) : [line]));
</script>

<Seo title="Resume" description="The resume of Arun BM, full-stack developer: experience, skills, projects and education." />

<Top>
	<section class="intro">
		<h1>Resume</h1>
		<p>{summary}</p>
		<p class="pdf"><a class="dl" href="{assets}/ArunBM_Resume.pdf" download>Download the PDF</a><span>Synced from the LaTeX source, {formatDate(resume.updated)}</span></p>
	</section>
</Top>

<main id="main">
	<div class="wrap">
		{#each rest as section}
			<section class="part">
				<h2 class="sec">{section.title}</h2>
				{#each section.entries as entry}
					{#if section.title === 'Skills' || section.title === 'Education'}
						<dl class="pairs">
							{#each pairs(entry, section.title === 'Skills') as [label, value]}
								{#if value}<div><dt>{label}</dt><dd>{value}</dd></div>{:else}<div class="solo"><dd>{label}</dd></div>{/if}
							{/each}
						</dl>
					{:else}
						<article class="entry">
							<header><h3>{entry.title}</h3>{#if entry.date}<span>{entry.date}</span>{/if}</header>
							{#each entry.lines as line}<p class="sub">{line}</p>{/each}
							{#if entry.items.length}
								<ul>
									{#each entry.items as item}
										<li>{item.text}{#if item.date}<span class="when">, {item.date}</span>{/if}{#if item.detail}<br /><span class="detail">{item.detail}</span>{/if}</li>
									{/each}
								</ul>
							{/if}
						</article>
					{/if}
				{/each}
			</section>
		{/each}
	</div>
</main>

<style>
	.intro { padding: 36px 0 52px; }
	h1 { font: 700 clamp(2.8rem, 1.4rem + 6vw, 6rem)/0.9 var(--display); letter-spacing: -0.03em; margin-left: -0.04em; }
	.intro p { margin-top: 18px; color: var(--band-muted); max-width: 62ch; }
	.pdf { display: flex; flex-wrap: wrap; align-items: center; gap: 10px 20px; }
	.dl { display: inline-block; background: #fff; color: #000; font-weight: 700; padding: 12px 18px; border-radius: 4px; transition: background-color 200ms var(--ease); }
	.dl:hover { background: #d9d9d9; }
	.pdf span { font-size: 14px; }
	.entry { padding: 20px 0; border-top: 1px solid var(--line); }
	.entry header { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 4px 20px; align-items: baseline; }
	.entry h3 { font: 500 1.25rem/1.2 var(--display); }
	.entry header span { color: var(--muted); font-size: 15px; }
	.sub { color: var(--muted); font-size: 15px; margin-top: 4px; overflow-wrap: anywhere; }
	.entry ul { margin-top: 10px; padding-left: 1.1em; max-width: 72ch; }
	.entry li { font-size: 16px; }
	.entry li + li { margin-top: 6px; }
	.when, .detail { color: var(--muted); }
	.pairs { display: grid; gap: 12px; }
	.pairs div { display: grid; gap: 2px; padding: 12px 0; border-top: 1px solid var(--line); }
	.pairs dt { font: 500 1.05rem var(--display); }
	.pairs dd { color: var(--muted); }
	.pairs .solo dd { color: var(--ink); }
	@media (min-width: 720px) {
		.pairs div { grid-template-columns: 220px 1fr; gap: 20px; }
		.pairs .solo { grid-template-columns: 1fr; }
	}
</style>
