import { expect, test } from './baseFixtures.ts';

test('login button redirects to google', async ({ page }) => {
	await page.goto('/');
	await page.getByRole('button').click();
	await page.waitForURL('**/accounts.google.com/**');
	expect(page.url()).toContain('https://accounts.google.com/');
});
