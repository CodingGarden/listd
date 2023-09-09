<script lang="ts">
	import { LL } from '$lib/i18n/i18n-svelte';
	import { ProgressRadial } from '@skeletonlabs/skeleton';
	import type { YouTubeChannelMetaAPIResponse } from '$/lib/server/YouTubeAPI';
	import ChannelCard from '$/lib/components/ChannelCard.svelte';
	import { applyAction, enhance } from '$app/forms';
	import ChannelCardActions from './ChannelCardActions.svelte';

	export let results: YouTubeChannelMetaAPIResponse[] | undefined;
	export let locale: string;
	export let channels: YouTubeChannelMetaAPIResponse[];
	export let channelIds: Map<string, number>;

	let loading = false;
</script>

<form
	class="mt-4 flex flex-col gap-4"
	action="/create?/search"
	use:enhance={() => {
		loading = true;
		return ({ result }) => {
			loading = false;
			return applyAction(result);
		};
	}}
	method="post">
	<label class="label">
		<span>{$LL.pages.create.labels.channelSearch()}</span>
		<input
			class="input"
			type="text"
			name="search"
			placeholder={$LL.pages.create.messages.channelSearch()} />
	</label>
</form>

{#if loading}
	<div class="flex items-center gap-4">
		<ProgressRadial class="h-6 w-6" stroke={100} />
		<span>Searching...</span>
	</div>
{/if}

{#if results}
	<div class="max-h-64 overflow-y-auto" class:hidden={loading}>
		{#each results as result}
			<ChannelCard {locale} channel={result}>
				<ChannelCardActions channel={result} bind:channels bind:channelIds />
			</ChannelCard>
		{/each}
	</div>
{:else}
	<span class="text-gray-400">
		Search for a channel above to add it to the list.
	</span>
{/if}
