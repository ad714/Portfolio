<script>
	import { base } from '$app/paths';
	import Top from '$lib/Top.svelte';
	import Seo from '$lib/Seo.svelte';
	import { site, live } from '$lib/site.js';
	import { list, formatDate } from '$lib/content.js';
	import resume from '$lib/resume.json';

	const work = list('work');
	const writing = list('writing').slice(0, 3);
	const skills = resume.sections
		.find((section) => section.title === 'Skills')
		.entries.flatMap((entry) => [entry.title, ...entry.lines])
		.map((line) => line.split(/\s*:\s*/))
		.filter(([label]) => ['Frontend', 'Backend', 'DevOps/Tools'].includes(label));
</script>

<Seo />

<Top>
	<section class="hero">
		<h1>{site.name}</h1>
		<div class="role">
			<p class="big">{site.line}</p>
			<dl class="facts">
				{#each site.facts as [label, value]}<div><dt>{label}</dt><dd>{value}</dd></div>{/each}
			</dl>
		</div>
	</section>
</Top>

<main id="main">
	<div class="wrap">
		<div class="wm" aria-hidden="true" style="top: 40px; right: -140px">{work[0].proof}</div>
		<h2 class="sec">Top order</h2>
		<div class="head" aria-hidden="true"><span></span><span>Project</span><span>Proof</span><span>What it took</span></div>
		<ol class="order">
			{#each work as project, index}
				<li>
					<a class="row {index === 0 ? 'inv' : 'comp'}" href="{base}/work/{project.slug}/">
						<span class="pos">{project.rank}</span>
						<h3>{project.title}<small>{project.dates}, {project.role}</small></h3>
						<div class="num">{project.proof}<span>{project.proofLabel}</span></div>
						<p><b>{project.headline}</b> {project.line}<span class="stack">{project.stack}</span></p>
					</a>
				</li>
			{/each}
		</ol>
	</div>

	<div class="wrap">
		<div class="wm" aria-hidden="true" style="top: 60px; left: -200px">3</div>
		<h2 class="sec">At Snapshareai</h2>
		<div class="snap">
			<div class="inv lead">
				<p class="headline">{site.snapshare.headline}</p>
				<p>{site.snapshare.line}</p>
			</div>
			<dl class="comp areas">
				{#each site.snapshare.areas as [title, text]}<div><dt>{title}</dt><dd>{text}</dd></div>{/each}
			</dl>
		</div>
	</div>

	<div class="wrap">
		<h2 class="sec">Works with</h2>
		<div class="skills">
			{#each skills as [label, value]}
				<div><h3>{label === 'DevOps/Tools' ? 'Infra and tools' : label}</h3><p>{value}</p></div>
			{/each}
		</div>

		{#if live.writing && writing.length}
			<h2 class="sec">Writing</h2>
			<ul class="writing">
				{#each writing as post}
					<li><time datetime={post.date}>{formatDate(post.date)}</time><div><a href="{base}/writing/{post.slug}/">{post.title}</a><span class="aside">{post.aside}</span></div></li>
				{/each}
			</ul>
			<a class="more" href="{base}/writing/">All writing</a>
		{/if}

		<nav class="elsewhere" aria-label="More">
			{#if live.builds}<a class="comp" href="{base}/builds/"><b>Builds</b><span>Small things that never made the resume</span></a>{/if}
			{#if live.log}<a class="comp" href="{base}/log/"><b>Log</b><span>Films, food and cricket, ball by ball</span></a>{/if}
			<a class="inv" href="{base}/resume/"><b>Resume</b><span>Synced from the LaTeX source, {formatDate(resume.updated)}</span></a>
		</nav>
	</div>
</main>

<style>
	.hero { padding: 40px 0 56px; }
	h1 { font: 700 clamp(3.4rem, 1.2rem + 9vw, 8.4rem)/0.88 var(--display); letter-spacing: -0.03em; margin-left: -0.05em; }
	.role { display: grid; gap: 24px; margin-top: 28px; }
	.big { font: 500 clamp(1.3rem, 1.05rem + 1vw, 1.9rem)/1.25 var(--display); max-width: 24ch; }
	.facts { display: grid; gap: 6px; font-size: 15px; }
	.facts div { display: grid; grid-template-columns: 64px 1fr; gap: 12px; }
	.facts dt { color: var(--band-muted); }

	.head { display: none; }
	.order { list-style: none; padding: 0; display: grid; gap: 10px; }
	.row { display: grid; grid-template-columns: 26px 1fr; gap: 6px 14px; padding: 20px 18px; transition: background-color 200ms var(--ease); }
	.row > :nth-child(n + 3) { grid-column: 2; }
	.row.comp:hover { background: var(--comp-hover); }
	.row.inv:hover { background: #161616; }
	.row h3 { font: 500 clamp(1.35rem, 1.1rem + 0.8vw, 1.75rem)/1.05 var(--display); transition: translate 200ms var(--ease); }
	.row:hover h3 { translate: 4px 0; }
	.row h3 small { display: block; font: 400 14px/1.4 var(--text); color: var(--muted); margin-top: 6px; }
	.pos { color: var(--muted); font-size: 14px; padding-top: 6px; }
	.num { font: 700 clamp(2rem, 1.6rem + 1.2vw, 2.6rem)/1 var(--display); margin-top: 8px; }
	.num span { display: block; font: 400 14px/1.3 var(--text); color: var(--muted); margin-top: 4px; }
	.row p { font-size: 15px; color: var(--muted); }
	.row p b { color: inherit; font-weight: 500; }
	.row.comp p b { color: var(--ink); }
	.row.inv p b { color: #fff; }
	.stack { display: block; margin-top: 6px; font-size: 13px; }

	.snap { display: grid; gap: 16px; }
	.lead { padding: 26px; display: flex; flex-direction: column; gap: 16px; }
	.headline { font: 700 clamp(2rem, 1.3rem + 2.6vw, 3.4rem)/0.98 var(--display); letter-spacing: -0.02em; }
	.lead p:last-child { color: var(--muted); }
	.areas { padding: 26px; display: grid; gap: 18px; }
	.areas dt { font: 500 1.3rem/1.1 var(--display); }
	.areas dd { color: var(--muted); font-size: 15px; margin-top: 3px; }

	.skills { display: grid; gap: 24px; }
	.skills h3 { font: 500 1.2rem var(--display); margin-bottom: 4px; }
	.skills p { font-size: 15px; color: var(--muted); }

	.writing { list-style: none; padding: 0; }
	.writing li { display: grid; gap: 2px; padding: 14px 0; border-top: 1px solid var(--line); }
	.writing time { font-size: 14px; color: var(--muted); }
	.writing a { font-size: 1.15rem; }
	.writing a:hover { text-decoration: underline; text-underline-offset: 4px; }
	.aside { display: block; color: var(--muted); font-size: 15px; }

	.elsewhere { display: grid; gap: 12px; margin-top: 72px; }
	.elsewhere a { padding: 22px 24px; transition: background-color 200ms var(--ease); }
	.elsewhere a.comp:hover { background: var(--comp-hover); }
	.elsewhere a.inv:hover { background: #161616; }
	.elsewhere b { display: block; font: 500 1.5rem var(--display); transition: translate 200ms var(--ease); }
	.elsewhere a:hover b { translate: 4px 0; }
	.elsewhere span { color: var(--muted); font-size: 15px; }

	@media (min-width: 720px) {
		.role { grid-template-columns: 1fr 1fr; gap: 40px; align-items: end; }
		.snap { grid-template-columns: 5fr 7fr; gap: 24px; }
		.skills { grid-template-columns: repeat(3, 1fr); gap: 28px 36px; }
		.writing li { grid-template-columns: 120px 1fr; gap: 18px; align-items: baseline; }
		.elsewhere { grid-auto-flow: column; grid-auto-columns: 1fr; margin-top: 96px; }
	}
	@media (min-width: 900px) {
		.head { display: grid; grid-template-columns: 34px 1.3fr 170px 1fr; gap: 20px; font-size: 13px; color: var(--muted); padding: 0 24px 8px; }
		.row { grid-template-columns: 34px 1.3fr 170px 1fr; gap: 20px; padding: 22px 24px; align-items: baseline; }
		.row > :nth-child(n + 3) { grid-column: auto; }
		.num { margin-top: 0; }
	}
</style>
