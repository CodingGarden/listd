import { redirect } from '@sveltejs/kit';

export const load = async ({ locals, route }) => {
	if (
		locals.session?.user &&
		!locals.session.user.settings.onboarded &&
		route.id !== '/(protected)/onboarding'
	) {
		throw redirect(302, '/onboarding');
	}
	if (
		locals.session?.user &&
		locals.session.user.settings.onboarded &&
		route.id === '/(protected)/onboarding'
	) {
		throw redirect(302, '/');
	}
	return {
		session: locals.session,
		locale: locals.locale,
	};
};
