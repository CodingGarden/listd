/* eslint-disable no-console */
import { PrismaClient } from '@prisma/client';
import { seed as localeSeed } from './locales';
import { seed as testSeed } from './testSeed';

const prismaClient = new PrismaClient();

async function main() {
	let exitStatus = 0;
	try {
		await localeSeed(prismaClient);
		if (process.env.NODE_ENV?.toLowerCase() === 'test') {
			await testSeed(prismaClient);
		}
	} catch (error) {
		// TODO: use logging library
		console.error(error);
		exitStatus = 1;
	} finally {
		await prismaClient.$disconnect();
		process.exit(exitStatus);
	}
}

main();
