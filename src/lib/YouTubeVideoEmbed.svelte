<script lang="ts">
	import { DateTime, Duration } from 'luxon';
	import type { YouTubeVideoAPIResponse } from './server/YouTubeAPI';

	export let locale: string;
	export let video: YouTubeVideoAPIResponse;

	const viewCountFormatter = new Intl.NumberFormat(locale, {
		notation: 'compact',
		compactDisplay: 'short',
	});

	const formatDate = (timeStamp: number) => DateTime.fromMillis(timeStamp).toRelative({ locale });

	const formatDuration = (duration: string) => {
		const interval = Duration.fromISO(duration);
		let format = 'm:ss';
		if (interval.days && interval.days > 0) {
			format = 'd:hh:mm:ss';
		} else if (interval.hours && interval.hours > 0) {
			format = 'h:mm:ss';
		}
		return interval.toFormat(format);
	};
</script>

<div class="card cursor-pointer rounded-lg">
	<!-- <iframe
		class="aspect-video w-full"
		src={`https://www.youtube.com/embed/${video.videoId}`}
		title="YouTube video player"
		frameborder="0"
		allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
		allowfullscreen /> -->
	<!-- srcset={`${video.thumbnails.low} 600w, ${video.thumbnails.high} 800w`} -->
	<div class="relative">
		<img
			loading="lazy"
			class="aspect-video w-full rounded-lg"
			src={video.thumbnails.low}
			alt={video.title} />
		<!-- TODO: use icon library -->
		<p class="absolute bottom-1 left-1 rounded-md bg-black bg-opacity-60 py-0.5 px-1.5 text-xs">
			{viewCountFormatter.format(video.likes)} 👍
		</p>
		<p class="absolute bottom-1 right-1 rounded-md bg-black bg-opacity-60 py-0.5 px-1.5">
			{formatDuration(video.duration)}
		</p>
	</div>
	<div class="m-2">
		<p class="font-bold">{video.channelTitle}</p>
		<div class="light:text-gray-200 flex justify-between dark:text-gray-400">
			<p><span class="font-bold">{viewCountFormatter.format(video.viewCount)}</span> views</p>
			<p><span>{formatDate(video.publishedAt)}</span></p>
		</div>
		<!-- TODO: something better than ellipses... -->
		<p class="line-clamp-2 my-2 break-words">{video.title}</p>
	</div>
</div>
