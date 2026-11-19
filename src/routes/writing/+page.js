import { error } from '@sveltejs/kit';
import { live } from '$lib/site.js';

export const prerender = live.writing;

export function load() {
	if (!live.writing) error(404, 'Not found');
}
