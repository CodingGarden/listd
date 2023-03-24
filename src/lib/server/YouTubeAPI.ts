import { youtube, youtube_v3 } from '@googleapis/youtube';
import { config } from '$/lib/config.server';
import type { YouTubeMeta } from '@prisma/client';

const client = youtube({
	version: 'v3',
	auth: config.YOUTUBE_API_KEY,
});

const channelParts = ['id', 'snippet', 'statistics', 'brandingSettings'];
export type YouTubeChannelMetaAPIResponse = Omit<YouTubeMeta, 'createdAt' | 'updatedAt'>;

export type YouTubeVideoAPIResponse = {
	thumbnailUrl: string | null;
	title: string;
	videoId: string;
	channelTitle: string;
	publishedAt: number;
};

export function createYouTubeMetaAPIResponse(originId: string, channel: youtube_v3.Schema$Channel) {
	const subscriberCountNumber = Number(channel.statistics?.subscriberCount);
	const subscriberCount = Number.isNaN(subscriberCountNumber) ? 0 : subscriberCountNumber;
	// TODO: i18n
	const name = channel.snippet?.title || 'No Title';
	// TODO: use our own avatar service
	const avatarUrl =
		channel.snippet?.thumbnails?.default?.url || `https://ui-avatars.com/api/?name=${name}`;
	return {
		name,
		originId,
		description: channel.snippet?.description || 'No description set.',
		subscriberCount,
		avatarUrl,
		bannerUrl: channel.brandingSettings?.image?.bannerImageUrl || null,
		customUrl: channel.snippet?.customUrl || '@notfound',
		isVerified: false,
	};
}

export async function getChannel(id: string) {
	const { data } = await client.channels.list({
		part: channelParts,
		id: [id],
		maxResults: 1,
	});
	const ytChannel = data.items?.pop();
	if (ytChannel) {
		return createYouTubeMetaAPIResponse(id, ytChannel);
	}
	return null;
}

export async function getVideos(channelIds: string[]) {
	const videos: YouTubeVideoAPIResponse[] = [];

	await channelIds.reduce(async (promise, channelId) => {
		await promise;
		const { data } = await client.search.list({
			part: ['id', 'snippet'],
			channelId,
			type: ['video'],
			order: 'date',
			maxResults: 10,
		});
		data.items?.forEach((video) => {
			if (video && video.id?.videoId) {
				videos.push({
					thumbnailUrl:
						video.snippet?.thumbnails?.maxres?.url ||
						video.snippet?.thumbnails?.default?.url ||
						null,
					// TODO: i18n
					title: video.snippet?.title || 'No Video Title',
					videoId: video.id.videoId,
					channelTitle: video.snippet?.channelTitle || 'No Channel Title',
					publishedAt: video.snippet?.publishedAt
						? new Date(video.snippet?.publishedAt).getTime()
						: Date.now(),
				});
			}
		});
	}, Promise.resolve());
	videos.sort((a, b) => b.publishedAt - a.publishedAt);

	return videos;
}

export async function searchChannels(q: string) {
	// TODO: proxy, cache and use an API Key pool...
	const { data: searchResults } = await client.search.list({
		part: ['id', 'snippet'],
		q,
		type: ['channel'],
		maxResults: 50,
	});
	const ids = (searchResults.items || []).reduce((all, item) => {
		if (item.id?.channelId) {
			all.push(item.id?.channelId);
		}
		return all;
	}, [] as string[]);
	const { data } = await client.channels.list({
		part: channelParts,
		id: ids,
		maxResults: 50,
	});
	const byId = (data.items || []).reduce((all, item) => {
		if (item.id) {
			all.set(item.id, item);
		}
		return all;
	}, new Map<string, youtube_v3.Schema$Channel>());
	const results = (searchResults.items || []).reduce((all, item) => {
		if (item.id?.channelId) {
			const channel = byId.get(item.id.channelId);
			if (channel) {
				const metaResponse = createYouTubeMetaAPIResponse(item.id.channelId, channel);
				all.push(metaResponse);
			}
		}
		return all;
	}, [] as YouTubeChannelMetaAPIResponse[]);
	return results;
}
