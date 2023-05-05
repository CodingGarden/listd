<script lang="ts">
	import { page } from '$app/stores';
	import YouTubeVideoEmbed from '$/lib/YouTubeVideoEmbed.svelte';
	import ChannelCard from '$/lib/components/ChannelCard.svelte';
	import { ProgressRadial } from '@skeletonlabs/skeleton';
	import type { YouTubeVideoAPIResponse } from '$/lib/server/YouTubeAPI.js';

	export let data;

	let filter = '';

	let allVideos: YouTubeVideoAPIResponse[] = [];
	let filteredVideos: YouTubeVideoAPIResponse[] = [];
	let filterTimeout: number;

	const filterChanged = () => {
		if (filter) {
			clearTimeout(filterTimeout);
			filterTimeout = setTimeout(() => {
				const filterRegexp = new RegExp(filter, 'i');
				filteredVideos = allVideos.filter(
					(video) => video.description.match(filterRegexp) || video.title.match(filterRegexp)
				);
			}, 500) as unknown as number;
		} else {
			filteredVideos = allVideos;
		}
	};

	data.streamed.videos.then((result) => {
		allVideos = result;
		filteredVideos = allVideos;
	});
</script>

<slot />
{#if !$page.params.videoid}
	<h2 class="font-bold">{data.list?.title}</h2>
	<p>{data.list?.description}</p>
	<div
		class="my-4 grid grid-cols-1 place-content-center md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
		{#each data.list.items as item}
			{#if item.meta.youtubeMeta}
				<ChannelCard locale={data.locale} channel={item.meta.youtubeMeta} />
			{/if}
		{/each}
	</div>
	{#if data.session?.user?.id === data.list.userId}
		<div class="mb-4 flex justify-end">
			<a href={`/edit/${data.list.id}`} class="btn variant-ghost-primary">Edit</a>
		</div>
	{/if}
{/if}
<div>
	{#await data.streamed.videos}
		<span class="grid w-full place-items-center p-4">
			<ProgressRadial class="ml-2 h-8 w-8" stroke={100} />
		</span>
	{:then}
		<div class="my-4">
			<input on:input={filterChanged} bind:value={filter} class="input" />
		</div>
		<div
			class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
			{#each filteredVideos as video}
				<YouTubeVideoEmbed
					active={$page.params.videoid === video.videoId}
					locale={data.locale}
					{video} />
			{/each}
		</div>
	{/await}
</div>
