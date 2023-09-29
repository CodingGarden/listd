<script lang="ts">
	import { onMount } from 'svelte';
	import YouTubePlayer from 'youtube-player';
	import VideoPlayerStore from '$/lib/stores/VideoPlayerStore';
	import { get } from 'svelte/store';

	export let videoId: string;
	let videoElement: HTMLDivElement | null = null;
	let player: ReturnType<typeof YouTubePlayer> | null = null;

	onMount(() => {
		if (videoElement) {
			let start = 0;
			const currentState = get(VideoPlayerStore);
			if (currentState.type === 'seekTo') {
				start = currentState.value;
			}
			player = YouTubePlayer(videoElement, {
				height: '100%',
			});
			player.loadVideoById(videoId, start);
			player.playVideo();
		}
		const unsubscribe = VideoPlayerStore.subscribe((event) => {
			switch (event.type) {
				case 'seekTo': {
					player?.seekTo(event.value, true);
					break;
				}
				case 'setVideoId': {
					player?.cueVideoById(event.value);
					break;
				}
				default:
					break;
			}
		});
		return unsubscribe;
	});
</script>

<div class="aspect-video w-full">
	<div data-testid="video-embed" class="aspect-video w-full" bind:this={videoElement}></div>
</div>
