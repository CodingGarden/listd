<script lang="ts">
	import { onMount } from 'svelte';

	export let avatarUrl: string = '';
	export let altText: string = '';

	let currentUrl = '';
	let showFallback = false;

	const fallbackText =
		altText
			.split(' ')
			.slice(0, 3)
			.map((w) => w[0])
			.join('') || '??';

	onMount(() => {
		currentUrl = avatarUrl;
	});
</script>

{#if !showFallback}
	<img
		class="mr-1 inline-block h-14 w-14 rounded-full"
		referrerpolicy="no-referrer"
		src={currentUrl}
		on:error={() => {
			showFallback = true;
		}}
		alt={altText} />
{:else}
	<span class="mr-1 inline-flex h-14 w-14 items-center justify-center rounded-full bg-secondary-500"
		>{fallbackText}</span>
{/if}
