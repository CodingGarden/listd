import type {
	Session as OGSession,
	DefaultSession,
	User as OGUser,
} from '@auth/sveltekit/node_modules/@auth/core/types';
import type { UserSettings } from '@prisma/client';

// TODO: update when they fix this:
// https://github.com/nextauthjs/next-auth/issues/6640#issuecomment-1426801813
declare module '@auth/sveltekit/node_modules/@auth/core/types' {
	interface Session extends OGSession {
		user?: {
			id: string;
			settings: UserSettings;
		} & DefaultSession['user'];
	}

	interface User extends OGUser {
		settings: UserSettings;
	}
}

declare module '@sveltejs/kit' {
	interface Redirect extends Error {
		status: 300 | 301 | 302 | 303 | 304 | 305 | 306 | 307 | 308;
		location: string;
	}
}
