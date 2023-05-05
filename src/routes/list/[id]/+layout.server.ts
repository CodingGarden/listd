import { LL, setLocale } from '$/lib/i18n/i18n-svelte';
import { error } from '@sveltejs/kit';
import { get } from 'svelte/store';
import * as YouTubeAPI from '$lib/server/YouTubeAPI';
import { getList } from '$/lib/server/queries';

export async function load({ params, locals }) {
	try {
		// TODO: handle visibility
		const { list, channelIds } = await getList(params.id);

		if (list) {
			return {
				list,
				streamed: {
					videos: YouTubeAPI.getVideos(channelIds),
				},
			};
		}
	} catch (e) {
		/* empty */
	}
	setLocale(locals.locale);
	const $LL = get(LL);
	throw error(404, $LL.errors.notFound());
}
