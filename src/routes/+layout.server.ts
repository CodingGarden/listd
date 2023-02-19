import { redirect } from '@sveltejs/kit';
import type { Locales } from '$lib/i18n/i18n-types';
import type { LayoutServerLoad } from './$types';
import env from '../env.server';

export const load = (async ({ locals, route }) => {
	if (
		locals.session?.user &&
		!locals.session.user.settings.onboarded &&
		route.id !== '/(protected)/onboarding'
	) {
		// eslint-disable-next-line @typescript-eslint/no-throw-literal
		throw redirect(302, '/onboarding');
	}
	if (
		locals.session?.user &&
		locals.session.user.settings.onboarded &&
		route.id === '/(protected)/onboarding'
	) {
		// eslint-disable-next-line @typescript-eslint/no-throw-literal
		throw redirect(302, '/');
	}

	return {
		session: locals.session,
		locale: (locals.session?.user?.settings.localeId as Locales) || locals.detectedLocale,
		colorScheme: locals.session?.user?.settings.colorScheme || env.COLORSCHEME_DEFAULT,
	};
}) satisfies LayoutServerLoad;
