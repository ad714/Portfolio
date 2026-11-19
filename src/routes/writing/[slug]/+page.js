import { error } from '@sveltejs/kit';
import { list, find } from '$lib/content.js';
import { live } from '$lib/site.js';

export const prerender = live.writing;

export const entries = () => list('writing').map(({ slug }) => ({ slug }));

export function load({ params }) {
	if (!live.writing || !find('writing', params.slug)) error(404, 'No such post');
	return { slug: params.slug };
}
