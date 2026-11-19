import { error } from '@sveltejs/kit';
import { live } from '$lib/site.js';

export const prerender = live.builds;

export function load() {
	if (!live.builds) error(404, 'Not found');
}
