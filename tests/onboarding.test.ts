import { expect, test } from '@playwright/test';
import data from '../prisma/seeds/data/test.json' assert { type: 'json' };

test('new user redirects to the onboarding page', async ({ page, context }) => {
	await context.addCookies([
		{
			name: 'next-auth.session-token',
			value: data.session.sessionToken,
			path: '/',
			domain: 'localhost',
			expires: -1,
		},
	]);
	await page.goto('/');
	expect(page.url()).toContain('/onboarding');
});
