<script lang="ts">
	import { ProgressRadial } from '@skeletonlabs/skeleton';
	import ViewCount from '$/lib/ViewCount.svelte';
	import { formatNumberCompact, formatRelativeDate } from '$/lib/utils.js';
	import { afterNavigate } from '$app/navigation';
	import { page } from '$app/stores';
	import anchorme from 'anchorme';

	export let data;

	let breadcrumbs: HTMLDivElement;
	let videoStats: HTMLDivElement;
	let descriptionVisible = false;

	$: videoPromise = data.streamed.videos.then((videos) =>
		videos.find((v) => v.videoId === $page.params.videoid)
	);

	$: channelPromise = videoPromise.then((video) =>
		data.list.items.find((item) => item.meta.originId === video?.channelId)
	);

	afterNavigate(() => {
		breadcrumbs.scrollIntoView({
			behavior: 'smooth',
		});
		descriptionVisible = false;
	});

	const toggleDescription = () => {
		descriptionVisible = !descriptionVisible;
		if (!descriptionVisible) {
			videoStats.scrollIntoView({
				behavior: 'smooth',
			});
		}
	};
</script>

<div bind:this={breadcrumbs} class="flex w-full flex-wrap gap-2 text-2xl">
	<a href={`/list/${data.list.id}`}>{data.list.title}</a>
	<span class="crumb-separator" aria-hidden>&rsaquo;</span>
	<span class="overflow-hidden break-words">
		{#await videoPromise}
			Loading...
		{:then video}
			{#if video}
				{video.title}
			{:else}
				Not Found...
			{/if}
		{/await}
	</span>
</div>
<div class="my-4 w-full">
	{#await videoPromise}
		<span class="grid w-full place-items-center p-4">
			<ProgressRadial class="ml-2 h-8 w-8" stroke={100} />
		</span>
	{:then video}
		{#if video}
			<iframe
				data-testid="video-embed"
				class="aspect-video w-full"
				src={`https://www.youtube.com/embed/${video?.videoId}`}
				title="YouTube video player"
				frameborder="0"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
				allowfullscreen />
			<!-- TODO: the stuff below formatted... and scroll into view -->
			<div class="light:text-gray-200 unstyled card p-4 text-2xl dark:text-gray-400">
				{#await channelPromise}
					<span class="grid w-full place-items-center p-4">
						<ProgressRadial class="ml-2 h-8 w-8" stroke={100} />
					</span>
				{:then channel}
					{#if channel}
						<div class="mb-2 flex items-center gap-2">
							<img
								class="mr-1 inline-block h-12 w-12 rounded-full"
								referrerpolicy="no-referrer"
								src={channel.meta.imageUrl}
								alt={channel.name} />
							<div class="font-bold">{channel.name}</div>
						</div>
					{/if}
				{/await}
				<div bind:this={videoStats} class="mb-4 flex items-center gap-4">
					<span class="variant-soft-primary chip text-2xl"
						>{formatNumberCompact(video.likes, data.locale)} 👍</span>
					<ViewCount locale={data.locale} viewCount={video.viewCount} />
					<span>{formatRelativeDate(video.publishedAt, data.locale)}</span>
				</div>
			</div>
			<div
				data-testid="video-description"
				class:h-16={!descriptionVisible}
				class="light:text-gray-200 unstyled card relative mt-4 overflow-hidden whitespace-pre-wrap break-words p-4 text-2xl dark:text-gray-400">
				<!-- eslint-disable-next-line svelte/no-at-html-tags -->
				{@html anchorme({
					input: video.description,
					options: {
						attributes: {
							rel: 'noopener noreferrer',
							target: '_blank',
							class: 'text-secondary-500 underline',
						},
					},
				})}
				<button
					class="absolute bottom-[1px] right-4 inline-block bg-gradient-to-r from-transparent from-5% via-surface-100 p-2 pl-6 font-bold hover:cursor-pointer hover:text-primary-500 dark:via-surface-800"
					on:click={toggleDescription}>{descriptionVisible ? 'Show less' : '...more'}</button>
			</div>
		{:else}
			<h2>Not Found</h2>
		{/if}
	{/await}
</div>
