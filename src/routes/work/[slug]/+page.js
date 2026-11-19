import { error } from '@sveltejs/kit';
import { list, find } from '$lib/content.js';

export const entries = () => list('work').map(({ slug }) => ({ slug }));

export function load({ params }) {
	const project = find('work', params.slug);
	if (!project) error(404, 'No such project');
	const all = list('work');
	const next = all[(all.indexOf(all.find((p) => p.slug === params.slug)) + 1) % all.length];
	return { slug: params.slug, next: { slug: next.slug, title: next.title } };
}
