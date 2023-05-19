import { redirect, type Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { initAcceptLanguageHeaderDetector } from 'typesafe-i18n/detectors';
import { detectLocale } from '$lib/i18n/i18n-util.js';
import { SvelteKitAuth } from '@auth/sveltekit';
import Google from '@auth/core/providers/google';
import PrismaAdapter from '$lib/prisma/client';
import { config } from '$lib/config.server';
import prismaClient from '$lib/db.server';

const handleDetectLocale: Handle = async ({ event, resolve }) => {
	const acceptLanguageHeaderDetector = initAcceptLanguageHeaderDetector(event.request);
	const locale = detectLocale(acceptLanguageHeaderDetector);
	event.locals.locale = locale;

	return resolve(event, {
		transformPageChunk: ({ html }) => html.replace('%lang%', locale),
	});
};

const handleAuth: Handle = async (...args) => {
	const [{ event }] = args;
	return SvelteKitAuth({
		trustHost: true,
		adapter: PrismaAdapter(prismaClient),
		providers: [
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			Google({
				clientId: config.GOOGLE_CLIENT_ID,
				clientSecret: config.GOOGLE_CLIENT_SECRET,
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

				const settings = await prismaClient.userSettings.create({
					data: {
						localeId: locale?.id ?? 'en-US',
						userId: message.user.id,
					},
				});

				message.user.settings = settings;
			},
		},
	})(...args);
};

const protectedHandle: Handle = async ({ event, resolve }) => {
	await event.locals.getSession();
	if (!event.locals.session && event.route.id?.includes('(protected)')) {
		throw redirect(302, '/');
	}
	return resolve(event);
};

export const handle = sequence(handleDetectLocale, handleAuth, protectedHandle);

// import { redirect, type Handle } from '@sveltejs/kit';
// import { sequence } from '@sveltejs/kit/hooks';
// import { initAcceptLanguageHeaderDetector } from 'typesafe-i18n/detectors';
// import { detectLocale } from '$lib/i18n/i18n-util.js';
// import { SvelteKitAuth } from '@auth/sveltekit';
// import Google from '@auth/core/providers/google';
// import PrismaAdapter from '$lib/prisma/client';
// import { config } from '$/lib/config.server';
// import prismaClient from '$/lib/db.server';

// const handleDetectLocale: Handle = async ({ event, resolve }) => {
// 	const acceptLanguageHeaderDetector = initAcceptLanguageHeaderDetector(event.request);
// 	const locale = detectLocale(acceptLanguageHeaderDetector);
// 	event.locals.locale = locale;

// 	return resolve(event, {
// 		transformPageChunk: ({ html }) => html.replace('%lang%', locale),
// 	});
// };

// const handleAuth: Handle = async (...args) => {
// 	const [{ event }] = args;
// 	return SvelteKitAuth({
// 		trustHost: true,
// 		adapter: PrismaAdapter(prismaClient),
// 		providers: [
// // eslint-disable-next-line @typescript-eslint/ban-ts-comment
// // @ts-ignore
// Google({
// 	clientId: config.GOOGLE_CLIENT_ID,
// 	clientSecret: config.GOOGLE_CLIENT_SECRET,
// }),
// 		],
// 		callbacks: {
// 			async session({ session, user }) {
// 				session.user = {
// 					id: user.id,
// 					name: user.name,
// 					email: user.email,
// 					image: user.image,
// 					settings: user.settings,
// 				};
// 				event.locals.session = session;
// 				return session;
// 			},
// 		},
// 		events: {
// 			async createUser(message) {
// 				const locale = await prismaClient.locale.findFirst({
// 					where: {
// 						id: event.locals.locale,
// 					},
// 				});

// 				const settings = await prismaClient.userSettings.create({
// 					data: {
// 						localeId: locale?.id ?? 'en-US',
// 						userId: message.user.id,
// 					},
// 				});

// 				message.user.settings = settings;
// 			},
// 		},
// 	})(...args);
// };

// const protectedHandle: Handle = async ({ event, resolve }) => {
// 	await event.locals.getSession();
// 	if (!event.locals.session && event.route.id?.includes('(protected)')) {
// 		throw redirect(302, '/');
// 	}
// 	return resolve(event);
// };

// export const handle = sequence(handleDetectLocale, handleAuth, protectedHandle);
