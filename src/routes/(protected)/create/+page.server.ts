import { ListItemType, Visibility } from '@prisma/client';
import { fail } from '@sveltejs/kit';
import { LL, setLocale } from '$lib/i18n/i18n-svelte';
import { get } from 'svelte/store';
import { z, ZodError } from 'zod';
import * as YouTubeAPI from '$lib/server/YouTubeAPI';
import prismaClient from '$lib/db.server';

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
							listId: insertedList.id,
							listItemMetaId: existing.id,
							name: existing.name,
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
		const results = await YouTubeAPI.searchChannels(q);
		return { results };
	},
};
