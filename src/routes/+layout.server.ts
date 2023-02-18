import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals, route }) => {
	if (
		locals.session?.user &&
		!locals.session.user.settings.onboarded &&
		route.id !== '/(protected)/onboarding'
	) {
		// eslint-disable-next-line @typescript-eslint/no-throw-literal
		throw redirect(302, '/onboarding');
	}
	if (locals.session?.user && locals.session.user.settings.onboarded && route.id !== '/') {
		// eslint-disable-next-line @typescript-eslint/no-throw-literal
		throw redirect(302, '/');
	}
	return {
		session: locals.session,
		locale: locals.locale,
	};
}) satisfies LayoutServerLoad;
