import { expect, test } from '@playwright/test';

test('index page has expected anchor tag', async ({ page }) => {
	await page.goto('/');
	expect(await page.textContent('a')).toBe('listd.tv');
});
