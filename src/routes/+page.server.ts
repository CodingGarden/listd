import prismaClient from '$lib/db.server';
import type { List } from '@prisma/client';

export async function load({ locals }) {
	let lists: List[] = [];
	if (locals.session?.user) {
		lists = await prismaClient.list.findMany({
			where: {
				userId: locals.session.user.id,
			},
		});
	}
	return {
		lists,
		account: await prismaClient.account.findFirst({
			where: {
				userId: locals.session?.user?.id,
			},
		}),
	};
}
