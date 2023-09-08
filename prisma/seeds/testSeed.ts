import { Visibility, type PrismaClient, ListItemType } from '@prisma/client';
import data from './data/test.json' assert { type: 'json' };

export async function seed(prismaClient: PrismaClient) {
	await prismaClient.user.createMany({
		data: data.users.map((user) => user.user),
	});
	await prismaClient.userSettings.createMany({
		data: data.users.map((user) => user.userSettings),
	});
	await prismaClient.account.createMany({
		data: data.users.map((user) => user.account),
	});
	await prismaClient.session.createMany({
		data: data.users.map((user) => user.session),
	});

	await Promise.all(
		data.users.map(async (user) => {
			if (user.list) {
				await Promise.all(
					user.list.map(async (list) => {
						const { items, ...createList } = list;
						await prismaClient.list.create({
							data: {
								...createList,
								visibility: Visibility[createList.visibility as Visibility],
							},
						});
						await Promise.all(
							list.items.map(async (item) => {
								const { meta, ...createListItem } = item;
								const { youtubeMeta, ...createListItemMeta } = meta;
								await prismaClient.youTubeMeta.create({
									data: youtubeMeta,
								});
								await prismaClient.listItemMeta.create({
									data: {
										...createListItemMeta,
										type: ListItemType[createListItemMeta.type as ListItemType],
									},
								});
								await prismaClient.listItem.create({
									data: createListItem,
								});
							})
						);
					})
				);
			}
		})
	);
}
