import { LL, setLocale } from '$/lib/i18n/i18n-svelte';
import prismaClient from '$lib/db.server';
import { error } from '@sveltejs/kit';
import { get } from 'svelte/store';
import * as YouTubeAPI from '$lib/server/YouTubeAPI';

export async function load({ params, locals }) {
	try {
		// TODO: handle visibility
		const list = await prismaClient.list.findFirst({
			where: {
				id: params.id,
			},
			include: {
				items: {
					include: {
						meta: {
							include: {
								youtubeMeta: true,
							},
						},
					},
				},
			},
		});
		const channelIds = list?.items.map((item) => item.meta.originId) || [];

		if (list) {
			console.log(JSON.stringify(list, null, 2));
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
