import type { BrowserContext } from '@playwright/test';
import { L } from '../src/lib/i18n/i18n-node';
import data from '../prisma/seeds/data/test.json' assert { type: 'json' };

export function loginTestUser(context: BrowserContext) {
	return context.addCookies([
		{
			name: 'next-auth.session-token',
			value: data.session.sessionToken,
			path: '/',
			domain: 'localhost',
			expires: -1,
		},
	]);
}

export { L };
