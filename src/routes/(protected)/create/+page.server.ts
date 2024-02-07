import { ListItemType, Visibility } from '@prisma/client';
import { fail } from '@sveltejs/kit';
import { LL, setLocale } from '$lib/i18n/i18n-svelte';
import { get } from 'svelte/store';
import * as YouTubeAPI from '$lib/server/YouTubeAPI';
import prismaClient from '$lib/db.server';
import { createListSchema } from '$/lib/schemas';
import { superValidate } from 'sveltekit-superforms/server';

export async function load() {
	const schema = createListSchema(get(LL));
	const form = await superValidate(schema);
	return {
		form,
		visibility: Visibility,
		visibilities: Object.values(Visibility) as Visibility[],
	};
}

export const actions = {
	create: async (event) => {
		setLocale(event.locals.locale);
		const form = await superValidate(event.request, createListSchema(get(LL)));
		if (!form.valid) {
			return fail(400, { form });
		}
		try {
			const { title, slug, description, visibility, channelIds } = form.data;
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			const { user } = event.locals.session!;
			const insertedList = await prismaClient.list.create({
				data: {
					slug,
					title,
					description,
					visibility,
					// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
					userId: user!.id!,
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
				form,
				success: true,
				slug: insertedList.slug,
				username: event.locals.session?.user?.username,
			};
		} catch (e) {
			const error = e as Error;
			const { message } = error;
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
