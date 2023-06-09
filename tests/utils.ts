import type { BrowserContext } from '@playwright/test';
import { L } from '../src/lib/i18n/i18n-node';
import data from '../prisma/seeds/data/test.json' assert { type: 'json' };

export enum UserTypes {
	new = 0,
	onboarded = 1,
	hasList = 2,
}

export function loginTestUser(context: BrowserContext, userType: UserTypes) {
	return context.addCookies([
		{
			name: 'next-auth.session-token',
			value: data.users[userType].session.sessionToken,
			path: '/',
			domain: 'localhost',
			expires: -1,
		},
	]);
}

export { L };
