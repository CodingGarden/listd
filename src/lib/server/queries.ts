import prismaClient from '$lib/db.server';
import { Visibility, type Account } from '@prisma/client';

type GetListParams = {
	id?: string;
	username?: string;
	slug?: string;
	userId?: string;
};

async function findList({ id, slug, userId, account }: GetListParams & { account?: Account }) {
	return prismaClient.list.findFirst({
		where: {
			...(account
				? {
						userId: account.userId,
						slug,
					}
				: {
						id,
					}),
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
}

type ListWithItems = Awaited<Promise<PromiseLike<ReturnType<typeof findList>>>>;

export async function getList({ id, username, slug, userId }: GetListParams) {
	let list: ListWithItems | null = null;
	if (username) {
		const account = await prismaClient.account.findFirst({
			where: {
				provider: 'google',
				username,
			},
		});
		if (!account) {
			return {
				list,
				channelIds: [],
			};
		}
		list = await findList({ slug, userId, account });
	}

	if (!list && id) {
		list = await findList({ id, userId });
	}

	const channelIds = list?.items.map((item) => item.meta.originId) || [];
	return { list, channelIds };
}
