import { youtube, type youtube_v3 } from '@googleapis/youtube';
import { config } from '$/lib/config.server';
import type { YouTubeMeta } from '@prisma/client';
import redisClient from './redis';

const ytClient = youtube({
	version: 'v3',
	auth: config.YOUTUBE_API_KEY,
});

const channelParts = ['id', 'snippet', 'statistics', 'brandingSettings'];
export type YouTubeChannelMetaAPIResponse = Omit<YouTubeMeta, 'createdAt' | 'updatedAt'>;

export type YouTubeVideoAPIResponse = {
	thumbnails: {
		high: string | null;
		low: string | null;
	};
	title: string;
	description: string;
	videoId: string;
	channelTitle: string;
	channelId: string;
	publishedAt: number;
	viewCount: number;
	likes: number;
	duration: string;
	upcoming: boolean;
	livestream: {
		viewers: number;
		liveChatId: string;
		actualStartAt: number;
		scheduledStartAt: number;
	} | null;
};

export function parseYTDate(date: string | null | undefined) {
	return date ? new Date(date).getTime() : Date.now();
}

export function parseYTNumber(number: string | null | undefined) {
	return Number(number || 0);
}

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
	const { data } = await ytClient.channels.list({
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

async function getAllVideos(
	channelId: string,
	videos: YouTubeVideoAPIResponse[] = [],
	pageToken?: string
): Promise<YouTubeVideoAPIResponse[]> {
	const { data } = await ytClient.search.list({
		part: ['id', 'snippet'],
		channelId,
		type: ['video'],
		order: 'date',
		maxResults: 50,
		pageToken,
	});
	const ids = (data.items || []).reduce((all, item) => {
		if (item.id?.videoId) {
			all.push(item.id?.videoId);
		}
		return all;
	}, [] as string[]);
	const { data: videoData } = await ytClient.videos.list({
		part: [
			'id',
			'contentDetails',
			'liveStreamingDetails',
			'localizations',
			'snippet',
			'statistics',
		],
		id: ids,
		maxResults: 50,
	});
	videoData.items?.forEach((video) => {
		if (video && video.id) {
			const videoResponse = {
				thumbnails: {
					high:
						video.snippet?.thumbnails?.maxres?.url ||
						video.snippet?.thumbnails?.standard?.url ||
						video.snippet?.thumbnails?.high?.url ||
						null,
					low:
						video.snippet?.thumbnails?.medium?.url ||
						video.snippet?.thumbnails?.default?.url ||
						null,
				},
				// TODO: i18n
				title: video.snippet?.title || 'No Video Title',
				description: video.snippet?.description || '',
				videoId: video.id,
				channelTitle: video.snippet?.channelTitle || 'No Channel Title',
				channelId,
				publishedAt: video.snippet?.publishedAt
					? new Date(video.snippet?.publishedAt).getTime()
					: Date.now(),
				viewCount: parseYTNumber(video.statistics?.viewCount),
				likes: parseYTNumber(video.statistics?.likeCount),
				duration: video.contentDetails?.duration || 'PT0S',
				upcoming: video.snippet?.liveBroadcastContent === 'upcoming',
				livestream: video.liveStreamingDetails
					? {
							live: video.snippet?.liveBroadcastContent === 'live',
							viewers: parseYTNumber(video.liveStreamingDetails.concurrentViewers),
							liveChatId: video.liveStreamingDetails.activeLiveChatId || '',
							actualStartAt: parseYTDate(video.liveStreamingDetails.actualStartTime),
							scheduledStartAt: parseYTDate(video.liveStreamingDetails.scheduledStartTime),
					  }
					: null,
			};
			videoResponse.thumbnails.high = videoResponse.thumbnails.high?.replace('_live', '') || null;
			videoResponse.thumbnails.low = videoResponse.thumbnails.low?.replace('_live', '') || null;
			videos.push(videoResponse);
		}
	});
	if (data.nextPageToken) {
		return getAllVideos(channelId, videos, data.nextPageToken);
	}
	return videos;
}

async function getChannelVideos(channelId: string) {
	const cacheKey = `yt:videos:(channelId:${channelId})`;
	const cachedVideos = await redisClient.get(cacheKey);
	if (cachedVideos) {
		return JSON.parse(cachedVideos) as YouTubeVideoAPIResponse[];
	}
	const videos = await getAllVideos(channelId);
	await redisClient.set(cacheKey, JSON.stringify(videos), {
		EX: 60 * 60 * 24,
	});
	return videos;
}

export async function getVideos(channelIds: string[]) {
	let videos: YouTubeVideoAPIResponse[] = [];

	await channelIds.reduce(async (promise, channelId) => {
		await promise;
		const channelVideos = await getChannelVideos(channelId);
		videos = videos.concat(channelVideos);
	}, Promise.resolve());
	videos.sort((a, b) => b.publishedAt - a.publishedAt);

	return videos;
}

export async function searchChannels(q: string) {
	// TODO: proxy, cache and use an API Key pool...
	const { data: searchResults } = await ytClient.search.list({
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
	const { data } = await ytClient.channels.list({
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
