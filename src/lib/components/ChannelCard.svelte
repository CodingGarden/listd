<script lang="ts">
	import type { YouTubeChannelMetaAPIResponse } from '$/lib/server/YouTubeAPI';
	import { onMount } from 'svelte';

	export let channel: YouTubeChannelMetaAPIResponse;
	export let locale: string;
	export let compact = false;
	export let shouldFocus = false;

	const subscriberFormatter = new Intl.NumberFormat(locale, {
		notation: 'compact',
		compactDisplay: 'short',
	});

	let element: HTMLDivElement | null = null;

	onMount(() => {
		if (element && shouldFocus) {
			element.scrollIntoView({
				behavior: 'smooth',
			});
		}
	});
</script>

<div
	bind:this={element}
	class="card overflow-hidden p-4"
	class:grid={compact}
	class:content-center={compact}>
	<header>
		<div class="flex gap-2" class:flex-col={compact} class:items-center={compact}>
			{#if compact}
				<img
					class="mr-1 inline-block h-12 w-12 rounded-full"
					referrerpolicy="no-referrer"
					src={channel.avatarUrl}
					alt={channel.name} />
				<div class="text-center font-bold">{channel.name}</div>
			{:else}
				<img
					class="mr-1 inline-block h-12 w-12 rounded-full"
					referrerpolicy="no-referrer"
					src={channel.avatarUrl}
					alt={channel.name} />
				<div>
					<div class="font-bold">{channel.name}</div>
					<div>{channel.customUrl}</div>
					<div>
						{subscriberFormatter.format(Number(channel.subscriberCount))} subscribers
					</div>
				</div>
			{/if}
		</div>
	</header>
	<footer class="card-footer mt-4 flex justify-end" class:justify-center={compact}>
		<slot />
	</footer>
</div>
