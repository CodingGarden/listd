<script lang="ts">
	import { ProgressRadial } from '@skeletonlabs/skeleton';
	import { LL } from '$lib/i18n/i18n-svelte';

	let loading = false;

	export let content: string;
	export let clickHandler: () => void;

	const handle = (event: { currentTarget: EventTarget & HTMLButtonElement }) => {
		loading = true;
		event.currentTarget.disabled = true;
		clickHandler();
	};
</script>

<button on:click={handle} class="btn variant-filled-primary">
	{#if loading}
		{$LL.pleaseWait()} <ProgressRadial class="ml-2 h-6 w-6" stroke={100} />
	{:else}
		{content}
	{/if}
</button>
