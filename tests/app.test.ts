import { expect, test } from './baseFixtures.ts';

test('index page has expected anchor tag', async ({ page }) => {
	await page.goto('/');
	expect(await page.textContent('a')).toBe('listd.tv');
});
