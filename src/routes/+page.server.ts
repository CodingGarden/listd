import prismaClient from '$lib/db.server';
import type { ListWithItems } from '../../types/db';

export async function load({ locals }) {
	let lists: ListWithItems[] = [];
	if (locals.session?.user) {
		lists = (await prismaClient.list.findMany({
			where: {
				userId: locals.session.user.id,
			},
			orderBy: {
				createdAt: 'desc',
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
		})) as unknown as ListWithItems[];
	}
	return {
		user: locals.session?.user,
		lists,
		account: await prismaClient.account.findFirst({
			where: {
				userId: locals.session?.user?.id,
			},
		}),
	};
}
