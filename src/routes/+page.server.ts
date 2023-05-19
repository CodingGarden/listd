import prismaClient from '$lib/db.server';
import type { CoreValue } from '@prisma/client';

export async function load({ locals }) {
	let coreValues: CoreValue[] = [];
	if (locals.session?.user) {
		coreValues = await prismaClient.coreValue.findMany();
	}

	return {
		coreValues,
	};
}
