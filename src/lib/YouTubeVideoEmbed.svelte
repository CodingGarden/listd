<script lang="ts">
	import { page } from '$app/stores';
	import { formatNumberCompact, formatDuration, formatRelativeDate } from '$lib/utils';
	import ViewCount from '$lib/ViewCount.svelte';
	import type { YouTubeVideoAPIResponse } from './server/YouTubeAPI';

	export let locale: string;
	export let active: boolean;
	export let video: YouTubeVideoAPIResponse;
</script>

<a
	href={`/list/${$page.params.id}/watch/${video.videoId}`}
	class:variant-filled-primary={active}
	class="card card-hover block cursor-pointer rounded-lg">
	<div class="relative p-1">
		<img
			loading="lazy"
			class="aspect-video w-full rounded-lg"
			src={video.thumbnails.low}
			alt={video.title} />
		<!-- TODO: use icon library -->
		<p class="absolute bottom-1 left-1 rounded-md bg-black bg-opacity-60 px-1.5 py-0.5 text-xs">
			{formatNumberCompact(video.likes, locale)} 👍
		</p>
		<p class="absolute bottom-1 right-1 rounded-md bg-black bg-opacity-60 px-1.5 py-0.5">
			{formatDuration(video.duration)}
		</p>
	</div>
	<div class="m-2">
		<p class="font-bold">{video.channelTitle}</p>
		<div
			class:dark:text-gray-400={!active}
			class:light:text-gray-200={!active}
			class="flex justify-between">
			<ViewCount {locale} viewCount={video.viewCount} />
			<span>{formatRelativeDate(video.publishedAt, locale)}</span>
		</div>
		<!-- TODO: something better than ellipses... -->
		<p class="my-2 line-clamp-2 break-words">{video.title}</p>
	</div>
</a>
