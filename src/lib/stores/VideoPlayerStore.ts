import { writable } from 'svelte/store';

interface PlayerInitEvent {
	type: 'init';
	value: null;
}

interface PlayerSeekToEvent {
	type: 'seekTo';
	value: number;
}

interface PlayerSetVideoIdEvent {
	type: 'setVideoId';
	value: string;
}

export default writable<PlayerInitEvent | PlayerSeekToEvent | PlayerSetVideoIdEvent>({
	type: 'init',
	value: null,
});
