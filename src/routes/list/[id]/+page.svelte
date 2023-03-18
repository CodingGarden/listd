<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<h2 class="font-bold">{data.list?.title}</h2>
<p>{data.list?.description}</p>
<!-- {#each data.list.items as item}
	<p>{item.name}</p>
{/each} -->
<div>
	{#each data.videos as video}
		<div class="card">
			<!-- <img
				class="w-full"
				src={video.snippet?.thumbnails?.maxres?.url || video.snippet?.thumbnails?.default?.url}
				alt={video.snippet?.title} /> -->
			<iframe
				class="w-full"
				src={`https://www.youtube.com/embed/${video.id?.videoId}`}
				title="YouTube video player"
				frameborder="0"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
				allowfullscreen />
			<p class="text-center font-bold">{video.snippet?.channelTitle}</p>
			<p class="text-center">{video.snippet?.title}</p>
		</div>
	{/each}
</div>
