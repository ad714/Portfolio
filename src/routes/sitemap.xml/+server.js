import { site, live } from '$lib/site.js';
import { list } from '$lib/content.js';

export const prerender = true;

export function GET() {
	const paths = [
		'',
		...['writing', 'builds', 'log'].filter((key) => live[key]).map((key) => `${key}/`),
		'resume/',
		...list('work').map((p) => `work/${p.slug}/`),
		...(live.writing ? list('writing') : []).map((p) => `writing/${p.slug}/`),
		...(live.log ? list('log') : []).map((p) => `log/${p.slug}/`)
	];
	const xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${paths.map((p) => `<url><loc>${site.url}/${p}</loc></url>`).join('')}</urlset>`;
	return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
}
