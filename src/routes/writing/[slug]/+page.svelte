<script>
	import Post from '$lib/Post.svelte';
	import { find } from '$lib/content.js';

	let { data } = $props();
</script>

<Post post={find('writing', data.slug)} back="/writing/" label="All writing" />
