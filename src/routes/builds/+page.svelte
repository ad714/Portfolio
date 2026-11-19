<script>
	import Top from '$lib/Top.svelte';
	import Seo from '$lib/Seo.svelte';
	import { list } from '$lib/content.js';

	const builds = list('builds').sort((a, b) => b.no - a.no);
</script>

<Seo title="Builds" description="Small tools by Arun BM: Telegram clipping, TV mirroring, CCTV detection, cricket market research." />

<Top>
	<section class="intro">
		<h1>Builds</h1>
		<p>Small things I made for myself. None of them are on the resume.</p>
	</section>
</Top>

<main id="main">
	<div class="wrap stage">
		<div class="wm" aria-hidden="true" style="bottom: 10px; right: -80px">{String(builds[0].no).padStart(2, '0')}</div>
		<ul class="stubs">
			{#each builds as build, i}
				<li class="stub {i === 0 ? 'inv' : 'comp'}">
					<div class="body">
						<h2>{build.title}</h2>
						<p>{build.line}</p>
						<span class="st">{build.stack}</span>
					</div>
					<div class="tear" aria-hidden="true"><span>ADMIT</span><span class="no">No. {String(build.no).padStart(4, '0')}</span><span>{build.year}</span></div>
				</li>
			{/each}
		</ul>
	</div>
</main>

<style>
	.intro { padding: 36px 0 52px; }
	h1 { font: 700 clamp(2.8rem, 1.4rem + 6vw, 6rem)/0.9 var(--display); letter-spacing: -0.03em; margin-left: -0.04em; }
	.intro p { margin-top: 14px; color: var(--band-muted); }
	.stage { padding-bottom: clamp(220px, 30vw, 420px); }
	.stubs { list-style: none; padding: 0; margin-top: 48px; display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 300px), 1fr)); gap: 20px; }
	.stub {
		--cut: radial-gradient(circle 10px at calc(100% - 84px) 0, #0000 98%, #000) top / 100% 51% no-repeat,
			radial-gradient(circle 10px at calc(100% - 84px) 100%, #0000 98%, #000) bottom / 100% 51% no-repeat;
		display: grid;
		grid-template-columns: 1fr 84px;
		min-height: 160px;
		-webkit-mask: var(--cut);
		mask: var(--cut);
	}
	.stub { --stub-ink: var(--ink); }
	.inv { --stub-ink: #fff; }
	:global(.night) .stub.comp { background: #fff; color: #0a0a0a; --muted: #5c5c5c; --stub-ink: #0a0a0a; outline: 0; }
	.body { padding: 18px 20px; }
	h2 { font: 500 1.4rem/1.05 var(--display); }
	.body p { font-size: 15px; line-height: 1.45; margin-top: 8px; color: var(--muted); }
	.st { display: block; margin-top: 12px; font-size: 13px; font-weight: 500; }
	.tear { border-left: 2px dashed #bdbdbd; padding: 16px 0; display: flex; flex-direction: column; align-items: center; justify-content: space-between; font-size: 11px; color: var(--muted); }
	.inv .tear { border-left-color: #555; }
	.no { writing-mode: vertical-rl; rotate: 180deg; font-size: 13px; letter-spacing: 0.06em; color: var(--stub-ink); }
</style>
