import type { PrismaClient } from '@prisma/client';
import data from './data/test.json' assert { type: 'json' };

export async function seed(prismaClient: PrismaClient) {
	await prismaClient.user.create({
		data: data.user,
	});
	await prismaClient.userSettings.create({
		data: data.userSettings,
	});
	await prismaClient.account.create({
		data: data.account,
	});
	await prismaClient.session.create({
		data: data.session,
	});
}
