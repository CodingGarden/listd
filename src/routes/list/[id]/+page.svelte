<script lang="ts">
	import { ProgressRadial } from '@skeletonlabs/skeleton';

	export let data;
</script>

<h2 class="font-bold">{data.list?.title}</h2>
<p>{data.list?.description}</p>
<!-- {#each data.list.items as item}
	<p>{item.name}</p>
{/each} -->
<div>
	{#await data.streamed.videos}
		<span class="grid w-full place-items-center p-4">
			<ProgressRadial class="ml-2 h-8 w-8" stroke={100} />
		</span>
	{:then videos}
		<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
			{#each videos as video}
				<div class="card">
					<!-- <img
					class="w-full"
					src={video.snippet?.thumbnails?.maxres?.url || video.snippet?.thumbnails?.default?.url}
					alt={video.snippet?.title} /> -->
					<!-- TODO: research lite embed -->
					<iframe
						class="aspect-video w-full"
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
	{/await}
</div>
