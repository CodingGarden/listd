import { redirect } from '@sveltejs/kit';
import prismaClient from '../../../lib/db.server';

export const actions = {
	default: async (event) => {
		if (!event.locals.session?.user) {
			redirect(302, '/');
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
		redirect(302, '/');
	},
};
