import { LL, setLocale } from '$/lib/i18n/i18n-svelte';
import { error } from '@sveltejs/kit';
import { get } from 'svelte/store';
import * as YouTubeAPI from '$lib/server/YouTubeAPI';
import { getList } from '$/lib/server/queries';

// eslint-disable-next-line consistent-return
export async function load({ params, locals }) {
	try {
		const { list, channelIds } = await getList({
			username: params.username,
			slug: params.slug,
			userId: locals.session?.user?.id,
		});

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
	error(404, $LL.errors.notFound());
}
