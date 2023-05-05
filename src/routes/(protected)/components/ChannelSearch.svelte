<script lang="ts">
	import { LL } from '$lib/i18n/i18n-svelte';
	import { applyAction, enhance } from '$app/forms';
	import { ProgressRadial } from '@skeletonlabs/skeleton';
	import type { YouTubeChannelMetaAPIResponse } from '$/lib/server/YouTubeAPI';
	import ChannelCard from '$/lib/components/ChannelCard.svelte';
	import ChannelCardActions from './ChannelCardActions.svelte';

	export let results: YouTubeChannelMetaAPIResponse[] | undefined;
	export let locale: string;
	export let channels: YouTubeChannelMetaAPIResponse[];
	export let channelIds: Map<string, number>;

	let hasSearched = false;
	let loading = false;
</script>

<form
	class="mt-4 flex flex-col gap-4"
	action="/create?/search"
	use:enhance={() => {
		loading = true;
		hasSearched = true;
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
<div class="my-4">
	<div class="overflow-y-auto" class:h-96={hasSearched}>
		{#if loading}
			<div class="grid place-content-center">
				<ProgressRadial class="ml-2 h-6 w-6" stroke={100} />
			</div>
		{/if}
		{#if results}
			<div class="h-full" class:hidden={loading}>
				{#each results as result}
					<ChannelCard {locale} channel={result}>
						<ChannelCardActions channel={result} bind:channels bind:channelIds />
					</ChannelCard>
				{/each}
			</div>
		{:else}
			<span class="my-4 block text-gray-400"
				>Search for a channel above to add it to the list.</span>
		{/if}
	</div>
</div>
