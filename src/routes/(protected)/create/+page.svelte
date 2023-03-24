<script lang="ts">
	import Seo from '$/routes/SEO.svelte';
	import { browser } from '$app/environment';
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { LL } from '$lib/i18n/i18n-svelte';
	import type { youtube_v3 } from '@googleapis/youtube';
	import ChannelCard from './ChannelCard.svelte';
	import ChannelCardActions from './ChannelCardActions.svelte';
	import ChannelSearch from './ChannelSelector.svelte';

	export let data;
	export let form;

	let channels: youtube_v3.Schema$Channel[] = [];

	$: channelIds = channels.reduce((byId, channel, index) => {
		if (channel.id) {
			byId.set(channel.id, index);
		}
		return byId;
	}, new Map<string, number>());

	$: channelIdList = [...channelIds.keys()];

	$: if (form?.success) {
		const url = `/list/${form.listId}`;
		if (browser) {
			goto(url);
		}
	}
</script>

<Seo title="Create a List" description="Create a List" />
<form class="mt-4 flex flex-col gap-4" action="/create?/create" method="post" use:enhance>
	{#if form?.error}
		<aside class="alert variant-filled-error">
			<div class="alert-message">
				<p class="whitespace-pre-line">{form.error}</p>
			</div>
		</aside>
	{/if}
	<div class="flex justify-end">
		<button class="btn variant-filled-secondary">{$LL.buttons.create()}</button>
	</div>
	<label class="label">
		<span>{$LL.labels.title()}</span>
		<input class="input" type="text" name="title" required />
	</label>
	<label class="label">
		<span>{$LL.labels.description()}</span>
		<textarea class="textarea" name="description" />
	</label>
	<label class="label">
		<span>{$LL.labels.visibility()}</span>
		<select class="select" name="visibility" value={data.visibility.Unlisted} required>
			{#each data.visibilities as visibility}
				<option value={visibility}>{$LL.enums.visibility[visibility]()}</option>
			{/each}
		</select>
	</label>
	<span class="label">Channels</span>
	{#if !channels.length}
		<span class="block text-gray-400">Search for a channel below to add it to the list.</span>
	{:else}
		<div class="grid max-h-96 grid-cols-2 overflow-y-auto">
			{#each channels as channel}
				<ChannelCard compact locale={data.locale} {channel}>
					<ChannelCardActions {channel} bind:channels bind:channelIds />
				</ChannelCard>
			{/each}
		</div>
	{/if}
	<select name="channelIds" multiple bind:value={channelIdList} class="hidden">
		{#each channelIdList as channelId}
			<option value={channelId}>{channelId}</option>
		{/each}
	</select>
	<ChannelSearch {form} {data} bind:channels bind:channelIds />
	<div class="flex justify-end">
		<button class="btn variant-filled-secondary">{$LL.buttons.create()}</button>
	</div>
</form>
