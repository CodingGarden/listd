import { redirect, type Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { initAcceptLanguageHeaderDetector } from 'typesafe-i18n/detectors';
import { detectLocale } from '$lib/i18n/i18n-util.js';
import { SvelteKitAuth } from '@auth/sveltekit';
import Google from '@auth/core/providers/google';
import PrismaAdapter from '$lib/PrismaAdapter';
import prismaClient from './db.server';

import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from '$env/static/private';

if (!GOOGLE_CLIENT_ID) {
	throw new Error('Missing GOOGLE_CLIENT_ID in .env');
}

if (!GOOGLE_CLIENT_SECRET) {
	throw new Error('Missing GOOGLE_CLIENT_SECRET in .env');
}

const handleDetectLocale = (async ({ event, resolve }) => {
	// TODO: get lang from cookie / user setting
	const acceptLanguageHeaderDetector = initAcceptLanguageHeaderDetector(event.request);
	const locale = detectLocale(acceptLanguageHeaderDetector);
	event.locals.locale = locale;

	return resolve(event, { transformPageChunk: ({ html }) => html.replace('%lang%', locale) });
}) satisfies Handle;

const handleAuth = (async (...args) => {
	const [{ event }] = args;
	return SvelteKitAuth({
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		adapter: PrismaAdapter(prismaClient),
		providers: [
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			Google({
				clientId: GOOGLE_CLIENT_ID,
				clientSecret: GOOGLE_CLIENT_SECRET,
			}),
		],
		callbacks: {
			async session({ session, user }) {
				session.user = {
					id: user.id,
					name: user.name,
					email: user.email,
					image: user.image,
					settings: user.settings,
				};
				event.locals.session = session;
				return session;
			},
		},
		events: {
			async createUser(message) {
				const locale = await prismaClient.locale.findFirst({
					where: {
						id: event.locals.locale,
					},
				});
				await prismaClient.userSettings.create({
					data: {
						localeId: locale?.id ?? 'en-US',
						userId: message.user.id,
					},
				});
			},
		},
	})(...args);
}) satisfies Handle;

const protectedHandle = (async ({ event, resolve }) => {
	await event.locals.getSession();
	if (!event.locals.session && event.route.id?.includes('protected')) {
		// eslint-disable-next-line @typescript-eslint/no-throw-literal
		throw redirect(302, '/');
	}
	return resolve(event);
}) satisfies Handle;

export const handle = sequence(handleDetectLocale, handleAuth, protectedHandle);
