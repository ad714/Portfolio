import { site, live } from '$lib/site.js';
import { list } from '$lib/content.js';

export const prerender = live.writing || live.log;

const escape = (text = '') => text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export function GET() {
	const items = [...list('writing').map((p) => ({ ...p, path: 'writing' })), ...list('log').map((p) => ({ ...p, path: 'log' }))]
		.sort((a, b) => b.date.localeCompare(a.date))
		.map(
			(p) => `<item><title>${escape(p.title)}</title><link>${site.url}/${p.path}/${p.slug}/</link><guid>${site.url}/${p.path}/${p.slug}/</guid><pubDate>${new Date(p.date).toUTCString()}</pubDate><description>${escape(p.aside)}</description></item>`
		)
		.join('');
	const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>${site.name}</title><link>${site.url}/</link><description>${escape(site.description)}</description>${items}</channel></rss>`;
	return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml' } });
}
