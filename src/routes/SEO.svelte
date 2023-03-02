<script lang="ts">
	import { seo } from '$lib/stores/SeoStore';
	import { onMount } from 'svelte';

	export const { title } = $seo;
	export const { description } = $seo;

	const loadSeo = () => {
		seo.set({
			title,
			description,
		});
	};

	loadSeo();

	onMount(() => {
		loadSeo();
	});
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />

	<meta name="keywords" content="listd, youtube, channels, lists, app" />

	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta
		property="og:image"
		content="https://user-images.githubusercontent.com/1373867/221797903-42b3a12d-7d63-4284-b17a-83e2721a5d83.png"
	/>
	<meta property="og:url" content="https://listd.tv" />

	<meta
		property="twitter:card"
		content="https://user-images.githubusercontent.com/1373867/221797903-42b3a12d-7d63-4284-b17a-83e2721a5d83.png"
	/>
	<meta property="twitter:url" content="https://listd.tv" />
	<meta property="twitter:title" content={title} />
	<meta property="twitter:description" content={description} />
	<meta
		property="twitter:image"
		content="https://user-images.githubusercontent.com/1373867/221797903-42b3a12d-7d63-4284-b17a-83e2721a5d83.png"
	/>
</svelte:head>
