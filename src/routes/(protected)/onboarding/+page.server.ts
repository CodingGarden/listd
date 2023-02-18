import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import prismaClient from '../../../db.server';

export const actions = {
	default: async (event) => {
		if (!event.locals.session?.user) {
			// eslint-disable-next-line @typescript-eslint/no-throw-literal
			throw redirect(302, '/');
		}
		// TODO: consume formdata, update user profile / settings
		await prismaClient.userSettings.update({
			where: {
				userId: event.locals.session.user.id,
			},
			data: {
				onboarded: true,
			},
		});
		// eslint-disable-next-line @typescript-eslint/no-throw-literal
		throw redirect(302, '/');
	},
} satisfies Actions;
