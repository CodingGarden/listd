<script lang="ts">
	import type { youtube_v3 } from '@googleapis/youtube';

	export let channelIds: Map<string, number>;
	export let channel: youtube_v3.Schema$Channel;
	export let channels: youtube_v3.Schema$Channel[];
</script>

{#if channelIds.has(channel.id || '')}
	<button
		on:click={() => {
			const index = channelIds.get(channel.id || '');
			if (index !== undefined) {
				channels.splice(index, 1);
				channels = channels;
			}
		}}
		type="button"
		class="btn variant-filled-primary">Remove</button>
{:else}
	<button
		on:click={() => {
			channels.push(channel);
			channels = channels;
		}}
		type="button"
		class="btn variant-ghost-primary">Add</button>
{/if}
