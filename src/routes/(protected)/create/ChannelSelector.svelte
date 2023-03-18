<script lang="ts">
	import { LL } from '$lib/i18n/i18n-svelte';
	import { applyAction, enhance } from '$app/forms';
	import { ProgressRadial } from '@skeletonlabs/skeleton';
	import type { youtube_v3 } from '@googleapis/youtube';
	import type { ActionData, PageData } from './$types';
	import ChannelCard from './ChannelCard.svelte';
	import ChannelCardActions from './ChannelCardActions.svelte';

	export let form: ActionData;
	export let data: PageData;
	export let channels: youtube_v3.Schema$Channel[];
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
			console.log(result.data);
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
	{#if loading}
		<ProgressRadial class="ml-2 h-6 w-6" stroke={100} />
	{/if}
	{#if form?.results}
		<div class="max-h-96 overflow-y-auto">
			{#each form.results as result}
				<ChannelCard locale={data.locale} channel={result}>
					<ChannelCardActions channel={result} bind:channels bind:channelIds />
				</ChannelCard>
			{/each}
		</div>
	{/if}
</div>
