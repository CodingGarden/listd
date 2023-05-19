import prismaClient from '$lib/db.server';
import { z } from 'zod';
import type { CoreValueReport } from '@prisma/client';

type ListResponse = {
	reports: CoreValueReport[];
	coreValueIds: string[];
};

export async function getList(
	id: string,
	userId: string | undefined = undefined
): Promise<ListResponse> {
	const { success } = z.string().uuid().safeParse(id);
	if (!success) {
		return {
			reports: [],
			coreValueIds: [],
		};
	}

	const reports = await prismaClient.coreValueReport.findMany({
		where: {
			userId,
		},
		include: {
			coreValue: true,
		},
	});

	const coreValueIds = reports.map((report: CoreValueReport) => report.coreValueId);

	return { reports, coreValueIds };
}

// import prismaClient from '$lib/db.server';
// import { z } from 'zod';

// export async function getList(id: string, userId: string | undefined = undefined) {
// 	const { success } = z.string().uuid().safeParse(id);
// 	if (!success) {
// 		return {
// 			list: null,
// 			channelIds: [],
// 		};
// 	}
// 	const list = await prismaClient.list.findFirst({
// 		where: {
// 			id,
// 			userId,
// 		},
// 		include: {
// 			items: {
// 				include: {
// 					meta: {
// 						include: {
// 							youtubeMeta: true,
// 						},
// 					},
// 				},
// 			},
// 		},
// 	});
// 	const channelIds = list?.items.map((item) => item.meta.originId) || [];
// 	return { list, channelIds };
// }
