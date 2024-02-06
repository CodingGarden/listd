<script lang="ts">
	import type { YouTubeChannelMetaAPIResponse } from '$/lib/server/YouTubeAPI';
	import { MinusSquare, PlusSquare } from 'lucide-svelte';
	import { LL } from '$lib/i18n/i18n-svelte';

	export let channelIds: Map<string, number>;
	export let channel: YouTubeChannelMetaAPIResponse;
	export let channels: YouTubeChannelMetaAPIResponse[];
</script>

{#if channelIds.has(channel.originId)}
	<button
		on:click={() => {
			const index = channelIds.get(channel.originId);
			if (index !== undefined) {
				channels.splice(index, 1);
				channels = channels;
			}
		}}
		type="button"
		class="variant-ghost-error btn flex gap-1"><MinusSquare /> {$LL.buttons.remove()}</button>
{:else}
	<button
		on:click={() => {
			channels.unshift(channel);
			channels = channels;
		}}
		type="button"
		class="variant-ghost-warning btn flex gap-1">
		<PlusSquare />
		{$LL.buttons.add()}
	</button>
{/if}
