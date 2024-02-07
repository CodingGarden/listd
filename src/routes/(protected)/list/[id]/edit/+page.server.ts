import { ListItemType, Visibility } from '@prisma/client';
import { error as httpError, fail } from '@sveltejs/kit';
import { LL, setLocale } from '$lib/i18n/i18n-svelte';
import { get } from 'svelte/store';
import * as YouTubeAPI from '$lib/server/YouTubeAPI';
import prismaClient from '$lib/db.server';
import { getList } from '$/lib/server/queries';
import { superValidate } from 'sveltekit-superforms/server';
import { createListSchema } from '$/lib/schemas';

export async function load({ params, locals }) {
	const { list, channelIds } = await getList({
		id: params.id,
		userId: locals.session?.user?.id,
	});
	const $LL = get(LL);
	setLocale(locals.locale);
	if (!list) {
		throw httpError(404, $LL.errors.notFound());
	}
	const schema = createListSchema($LL);
	const form = await superValidate(
		{
			id: list.id,
			title: list.title,
			slug: list.slug,
			description: list.description || '',
			visibility: list.visibility,
			channelIds,
		},
		schema
	);
	return {
		form,
		list,
		visibility: Visibility,
		visibilities: Object.values(Visibility) as Visibility[],
	};
}

export const actions = {
	update: async (event) => {
		setLocale(event.locals.locale);
		const form = await superValidate(event.request, createListSchema(get(LL)));
		if (!form.valid) {
			return fail(400, { form });
		}
		try {
			const { id: listId, title, slug, description, visibility, channelIds } = form.data;

			if (!listId) {
				throw new Error('Missing list id');
			}

			const result = await prismaClient.list.updateMany({
				where: {
					id: listId,
					userId: event.locals.session?.user?.id,
				},
				data: {
					title,
					slug,
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
				form,
				success: true,
				slug,
				username: event.locals.session?.user?.username,
			};
		} catch (e) {
			const error = e as Error;
			const { message } = error;
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
