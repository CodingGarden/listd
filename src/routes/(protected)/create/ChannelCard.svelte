<script lang="ts">
	import type { youtube_v3 } from '@googleapis/youtube';

	export let channel: youtube_v3.Schema$Channel;
	export let locale: string;
	export let compact = false;

	const subscriberFormatter = new Intl.NumberFormat(locale, {
		notation: 'compact',
		compactDisplay: 'short',
	});
</script>

<div class="card overflow-hidden p-4">
	<header>
		<div class="flex gap-2" class:flex-col={compact} class:items-center={compact}>
			{#if compact}
				<img
					class="mr-1 inline-block h-12 w-12 rounded-full"
					referrerpolicy="no-referrer"
					src={channel.snippet?.thumbnails?.default?.url}
					alt={channel.snippet?.title} />
				<div class="text-center font-bold">{channel.snippet?.title}</div>
			{:else}
				<img
					class="mr-1 inline-block h-12 w-12 rounded-full"
					referrerpolicy="no-referrer"
					src={channel.snippet?.thumbnails?.default?.url}
					alt={channel.snippet?.title} />
				<div>
					<div class="font-bold">{channel.snippet?.title}</div>
					<div>{channel.snippet?.customUrl}</div>
					<div>
						{subscriberFormatter.format(Number(channel.statistics?.subscriberCount))} subscribers
					</div>
				</div>
			{/if}
		</div>
	</header>
	<footer class="card-footer mt-4 flex justify-end">
		<slot />
	</footer>
</div>
