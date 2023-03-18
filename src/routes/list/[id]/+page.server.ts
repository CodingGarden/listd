import { config } from '$/lib/config.server';
import { LL, setLocale } from '$/lib/i18n/i18n-svelte';
import prismaClient from '$lib/db.server';
import { youtube, youtube_v3 } from '@googleapis/youtube';
import { error } from '@sveltejs/kit';
import { get } from 'svelte/store';

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
						meta: true,
					},
				},
			},
		});
		const client = youtube({
			version: 'v3',
			auth: config.YOUTUBE_API_KEY,
		});
		const channelIds = list?.items.map((item) => item.meta.originId) || [];
		let videos: youtube_v3.Schema$SearchResult[] = [];
		await channelIds.reduce(async (promise, channelId) => {
			await promise;
			const { data } = await client.search.list({
				part: ['id', 'snippet'],
				channelId,
				type: ['video'],
				maxResults: 10,
			});
			videos = videos.concat(data.items?.filter((i) => i) || []);
		}, Promise.resolve());
		videos.sort((a, b) => new Date(b.snippet?.publishedAt) - new Date(a.snippet?.publishedAt));
		if (list) {
			return {
				list,
				videos,
			};
		}
	} catch (e) {
		/* empty */
	}
	setLocale(locals.locale);
	const $LL = get(LL);
	throw error(404, $LL.errors.notFound());
}
