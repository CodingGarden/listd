<script lang="ts">
	import { page } from '$app/stores';
	import YouTubeVideoEmbed from '$/lib/YouTubeVideoEmbed.svelte';
	import ChannelCard from '$/lib/components/ChannelCard.svelte';
	import { ProgressRadial } from '@skeletonlabs/skeleton';
	import type { YouTubeVideoAPIResponse } from '$/lib/server/YouTubeAPI';

	export let data;

	let filter = '';

	const filterVideos = (videos: YouTubeVideoAPIResponse[], filterString = '') => {
		if (filterString === '') return videos;

		const filterRegexp = new RegExp(filterString, 'i');
		return videos.filter(
			(video) => video.description.match(filterRegexp) || video.title.match(filterRegexp)
		);
	};

	let timeout: NodeJS.Timeout;
	const updateFilter = (e: KeyboardEvent & { currentTarget: EventTarget & HTMLInputElement }) => {
		const { value } = e.target as HTMLInputElement;
		clearTimeout(timeout);

		// immediately clear filter when input field is cleared
		if (value === '') {
			filter = value;
			return;
		}

		// debounce filter
		timeout = setTimeout(() => {
			filter = value;
		}, 500);
	};
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
	{:then videos}
		<div class="my-4">
			<input on:keyup={updateFilter} class="input" />
		</div>
		<div
			class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
			{#each filterVideos(videos, filter) as video}
				<YouTubeVideoEmbed
					active={$page.params.videoid === video.videoId}
					locale={data.locale}
					{video} />
			{/each}
		</div>
	{/await}
</div>
