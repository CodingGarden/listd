import { expect, test } from '@playwright/test';

test('login button redirects to google', async ({ page }) => {
	await page.goto('/');
	await page.getByTestId('google-btn').click();
	await page.waitForURL('**/accounts.google.com/**');
	expect(page.url()).toContain('https://accounts.google.com/');
});
test('login button redirects to github', async ({ page }) => {
	await page.goto('/');
	await page.getByTestId('github-btn').click();
	await page.waitForURL('**/github.com/**');
	expect(page.url()).toContain('https://github.com/login');
});
