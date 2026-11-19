<script>
	import Post from '$lib/Post.svelte';
	import { find } from '$lib/content.js';

	let { data } = $props();
</script>

<Post post={find('log', data.slug)} back="/log/" label="The whole log" />
