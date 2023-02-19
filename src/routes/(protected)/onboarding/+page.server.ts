import { redirect, fail } from '@sveltejs/kit';
import { ColorScheme, type ColorScheme as ColorSchemeType } from '@prisma/client';
import { z } from 'zod';
import { locales } from '$lib/i18n/i18n-util';
import type { Locales } from '$lib/i18n/i18n-types';
import type { Actions } from './$types';
import prismaClient from '../../../db.server';
import type { LayoutServerLoad } from '../../$types';

const colorSchemeKeys: ColorSchemeType[] = Object.keys(ColorScheme) as ColorSchemeType[];
const localeEnum: [Locales, ...Locales[]] = [locales[0], ...locales];
const colorSchemeEnum: [ColorSchemeType, ...ColorSchemeType[]] = [
	colorSchemeKeys[0],
	...colorSchemeKeys.slice(1),
];

const onboardingScheme = z.object({
	locale: z.enum(localeEnum),
	colorScheme: z.enum(colorSchemeEnum),
});

export const actions = {
	default: async (event) => {
		if (!event.locals.session?.user) {
			// eslint-disable-next-line @typescript-eslint/no-throw-literal
			throw redirect(302, '/');
		}

		const formData = Object.fromEntries(await event.request.formData());
		const onboarding = onboardingScheme.safeParse(formData);

		if (!onboarding.success) {
			return fail(400, onboarding.error.flatten());
		}

		await prismaClient.userSettings.update({
			where: {
				userId: event.locals.session.user.id,
			},
			data: {
				onboarded: true,
				localeId: onboarding.data.locale,
				colorScheme: onboarding.data.colorScheme,
			},
		});

		// eslint-disable-next-line @typescript-eslint/no-throw-literal
		throw redirect(302, '/');
	},
} satisfies Actions;

export const load = (async () => ({
	locales: await prismaClient.locale.findMany(),
	colorSchemes: Object.values(ColorScheme),
})) satisfies LayoutServerLoad;
