import { expect, test } from './baseFixtures';
import { L } from './utils';

test('login button redirects to google', async ({ page }) => {
	await page.goto('/');
	await page.getByRole('button', { name: L.en.buttons.loginYouTube() }).click();
	await page.waitForURL('**/accounts.google.com/**');
	expect(page.url()).toContain('https://accounts.google.com/');
});
