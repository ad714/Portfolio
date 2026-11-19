import adapter from '@sveltejs/adapter-static';
import { mdsvex } from 'mdsvex';

export default {
	extensions: ['.svelte', '.md'],
	preprocess: [mdsvex({ extensions: ['.md'] })],
	kit: {
		adapter: adapter({ fallback: '404.html' }),
		paths: { base: process.env.BASE_PATH ?? '', relative: false },
		prerender: { handleHttpError: 'fail', handleUnseenRoutes: 'ignore' }
	}
};
