<script lang="ts">
	import { seo } from '$lib/stores/SeoStore';

	export let title = 'listd';
	export let description = 'listd';

	seo.set({
		title,
		description,
	});
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
</svelte:head>
