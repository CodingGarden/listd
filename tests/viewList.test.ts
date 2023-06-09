import { expect, test } from './baseFixtures';
import { loginTestUser, UserTypes } from './utils';

test.beforeEach(async ({ context }) => {
	await loginTestUser(context, UserTypes.hasList);
});

test('user with lists can see lists on home page', async ({ page }) => {
	await page.goto('/');
	await page.waitForSelector('.list-nav .list');
	const listLink = await page.locator('.list-nav .list a').first();
	const linkText = await listLink.textContent();
	await expect(linkText).toContain('Coding Garden');
});
