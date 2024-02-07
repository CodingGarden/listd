import prismaClient from '$lib/db.server';
import { Visibility } from '@prisma/client';
import { z } from 'zod';

export async function getList(id: string, userId: string | undefined = undefined) {
	const { success } = z.string().uuid().safeParse(id);
	if (!success) {
		return {
			list: null,
			channelIds: [],
		};
	}
	const list = await prismaClient.list.findFirst({
		where: {
			id,
			OR: [
				{ visibility: Visibility.Public },
				{ visibility: Visibility.Unlisted },
				userId
					? {
							AND: [{ userId }, { visibility: Visibility.Private }],
						}
					: {},
			],
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
	return { list, channelIds };
}
