import { error } from '@sveltejs/kit';
import { list, find } from '$lib/content.js';
import { live } from '$lib/site.js';

export const prerender = live.log;

export const entries = () => list('log').map(({ slug }) => ({ slug }));

export function load({ params }) {
	if (!live.log || !find('log', params.slug)) error(404, 'No such entry');
	return { slug: params.slug };
}
