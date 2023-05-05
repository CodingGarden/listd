import { ListItemType, Visibility } from '@prisma/client';
import { error as httpError, fail } from '@sveltejs/kit';
import { LL, setLocale } from '$lib/i18n/i18n-svelte';
import { get } from 'svelte/store';
import { z, ZodError } from 'zod';
import * as YouTubeAPI from '$lib/server/YouTubeAPI';
import prismaClient from '$lib/db.server';
import { getList } from '$/lib/server/queries';

export async function load({ params, locals }) {
	const { list, channelIds } = await getList(params.id, locals.session?.user?.id);
	if (!list) {
		setLocale(locals.locale);
		const $LL = get(LL);
		throw httpError(404, $LL.errors.notFound());
	}
	return {
		list,
		channelIds,
		visibility: Visibility,
		visibilities: Object.values(Visibility) as Visibility[],
	};
}

export const actions = {
	// TODO: change to update
	update: async (event) => {
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
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const formDataObject = Object.fromEntries(formData) as any;
		formDataObject.channelIds = channels;
		try {
			const { title, description, visibility, channelIds } =
				await ListCreateRequestSchema.parseAsync(formDataObject);
			const { id: listId } = event.params;
			const result = await prismaClient.list.updateMany({
				where: {
					id: listId,
					userId: event.locals.session?.user?.id,
				},
				data: {
					title,
					description,
					visibility,
				},
			});

			if (result.count === 0) {
				return fail(404, { error: 'List not found.' });
			}

			await prismaClient.listItem.deleteMany({
				where: {
					listId,
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
						const channel = await YouTubeAPI.getChannel(id);
						if (channel) {
							existing = await prismaClient.listItemMeta.create({
								data: {
									originId: id,
									name: channel.name,
									type: ListItemType.YouTubeChannel,
									imageUrl: channel.avatarUrl,
									youtubeMeta: {
										create: channel,
									},
								},
							});
						} else {
							throw new Error(`Channel with id: ${id} not found.`);
						}
					}
					await prismaClient.listItem.create({
						data: {
							listId,
							listItemMetaId: existing.id,
							name: existing.name,
						},
					});
					return existing;
				})
			);

			return {
				success: true,
				listId,
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
	// TODO: share this function with edit / create
	search: async (event) => {
		const formData = await event.request.formData();
		const q = (formData.get('search') || '').toString();
		const results = await YouTubeAPI.searchChannels(q);
		return { results };
	},
};
