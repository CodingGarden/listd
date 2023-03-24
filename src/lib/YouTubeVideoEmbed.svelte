<script lang="ts">
	import type { YouTubeVideoAPIResponse } from './server/YouTubeAPI';

	export let video: YouTubeVideoAPIResponse;

	let hover = false;
</script>

<div
	class="card cursor-pointer"
	on:mouseenter={() => {
		hover = true;
	}}>
	{#if hover}
		<iframe
			class="aspect-video w-full"
			src={`https://www.youtube.com/embed/${video.videoId}`}
			title="YouTube video player"
			frameborder="0"
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
			allowfullscreen />
	{:else}
		<img loading="lazy" class="aspect-video w-full" src={video.thumbnailUrl} alt={video.title} />
	{/if}
	<p class="text-center font-bold">{video.channelTitle}</p>
	<p class="text-center">{video.title}</p>
</div>
