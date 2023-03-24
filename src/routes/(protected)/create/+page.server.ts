import { ListItemType, Visibility } from '@prisma/client';
import { fail } from '@sveltejs/kit';
import { youtube, youtube_v3 } from '@googleapis/youtube';
import { LL, setLocale } from '$lib/i18n/i18n-svelte';
import { get } from 'svelte/store';
import { z, ZodError } from 'zod';
import prismaClient from '$lib/db.server';
import { config } from '$/lib/config.server';

export async function load() {
	return {
		visibility: Visibility,
		visibilities: Object.values(Visibility) as Visibility[],
	};
}

export const actions = {
	create: async (event) => {
		const $LL = get(LL);
		setLocale(event.locals.locale);
		const ListCreateRequestSchema = z.object({
			title: z.string().trim().min(1, $LL.errors.titleRequired()),
			description: z.string().trim().min(1, $LL.errors.descriptionRequired()).optional(),
			visibility: z.nativeEnum(Visibility),
			channelIds: z.array(z.string().trim().min(1)),
		});
		const formData = await event.request.formData();
		const channels = formData.getAll('channelIds');
		const formDataObject = Object.fromEntries(formData) as any;
		formDataObject.channelIds = channels;
		try {
			const { title, description, visibility, channelIds } =
				await ListCreateRequestSchema.parseAsync(formDataObject);
			const { user } = event.locals.session;
			const insertedList = await prismaClient.list.create({
				data: {
					title,
					description,
					visibility,
					// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
					userId: user!.id,
				},
			});

			// TODO: fail gracefully... use transactions... refactor this
			await Promise.all(
				channelIds.map(async (id) => {
					let existing = await prismaClient.listItemMeta.findFirst({
						where: {
							originId: id,
						},
					});
					if (!existing) {
						const client = youtube({
							version: 'v3',
							auth: config.YOUTUBE_API_KEY,
						});
						const { data } = await client.channels.list({
							part: ['id', 'snippet'],
							id: [id],
							maxResults: 1,
						});
						const ytChannel = data.items?.pop();
						if (ytChannel && ytChannel.snippet) {
							existing = await prismaClient.listItemMeta.create({
								data: {
									originId: id,
									name: ytChannel.snippet.title || '',
									type: ListItemType.YouTubeChannel,
								},
							});
						} else {
							throw new Error(`Channel with id: ${id} not found.`);
						}
					}
					await prismaClient.listItem.create({
						data: {
							listId: insertedList.id,
							listItemMetaId: existing.id,
							name: existing.name,
							// TODO: add description to listItemMeta
							// description: existing.description,
						},
					});
					return existing;
				})
			);

			return {
				success: true,
				listId: insertedList.id,
			};
		} catch (e) {
			const error = e as Error;
			let { message } = error;
			if (error instanceof ZodError) {
				const errorMessages = error.issues.map((issue) => issue.message);
				message = errorMessages.join('\n');
			}
			return fail(400, { error: message });
		}
	},
	search: async (event) => {
		const formData = await event.request.formData();
		const q = (formData.get('search') || '').toString();
		const client = youtube({
			version: 'v3',
			auth: config.YOUTUBE_API_KEY,
		});
		// TODO: proxy, cache and use an API Key pool...
		const { data: searchResults } = await client.search.list({
			part: ['id', 'snippet'],
			q,
			type: ['channel'],
			maxResults: 50,
		});
		const { data } = await client.channels.list({
			part: [
				'id',
				'snippet',
				'brandingSettings',
				'contentDetails',
				'localizations',
				'statistics',
				'status',
				'topicDetails',
			],
			id: searchResults.items?.map((item) => item.id?.channelId || ''),
			maxResults: 50,
		});
		const byId = (data.items || []).reduce((all, item) => {
			if (item.id) {
				all.set(item.id, item);
			}
			return all;
		}, new Map<string, youtube_v3.Schema$Channel>());
		const results = (searchResults.items || [])
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-non-null-asserted-optional-chain
			.map((item) => byId.get(item.id?.channelId!)!)
			.filter((i) => i);
		return { results };
	},
};
