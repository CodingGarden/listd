import { redirect } from '@sveltejs/kit';
import prismaClient from '../../../lib/db.server';

export const actions = {
	default: async (event) => {
		if (!event.locals.session?.user) {
			throw redirect(302, '/');
		}

		// TODO: Consume form data and update user profile/settings

		await prismaClient.userSettings.update({
			where: {
				userId: event.locals.session.user.id,
			},
			data: {
				onboarded: true,
			},
		});

		throw redirect(302, '/');
	},
};

// import { redirect } from '@sveltejs/kit';
// import prismaClient from '../../../lib/db.server';

// export const actions = {
// 	default: async (event) => {
// 		if (!event.locals.session?.user) {
// 			throw redirect(302, '/');
// 		}
// 		// TODO: consume formdata, update user profile / settings
// 		await prismaClient.userSettings.update({
// 			where: {
// 				userId: event.locals.session.user.id,
// 			},
// 			data: {
// 				onboarded: true,
// 			},
// 		});
// 		throw redirect(302, '/');
// 	},
// };
