import { error } from '@sveltejs/kit';
import { live } from '$lib/site.js';

export const prerender = live.log;

export function load() {
	if (!live.log) error(404, 'Not found');
}
