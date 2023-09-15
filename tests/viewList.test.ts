import { expect, test } from './baseFixtures';
import { loginTestUser, UserTypes } from './utils';
import data from '../prisma/seeds/data/test.json' assert { type: 'json' };

test.beforeEach(async ({ context }) => {
	await loginTestUser(context, UserTypes.hasList);
});

test('user with lists can see lists on home page', async ({ page }) => {
	await page.goto('/');
	await page.waitForSelector('.video-grid');
	const listLink = await page.locator('.video-grid a').first();
	const linkText = await listLink.textContent();
	await expect(linkText).toContain('Coding Garden');
});

test('viewing a list shows the list of channels and list of videos', async ({ page }) => {
	const listId = data.users[UserTypes.hasList]?.list?.[0].id;
	expect(listId).toBeDefined();
	await page.goto(`/list/${listId}`);
	const channelCards = await page.getByTestId('channel-card-list').locator('.card').all();
	expect(channelCards.length).toBe(2);
	expect(await channelCards[0].textContent()).toContain('Coding Garden');
	expect(await channelCards[1].textContent()).toContain('Coding Garden');
	await page.waitForSelector('[data-testid="video-list"]');
	const listVideos = await page.getByTestId('video-list').locator('.card').all();
	expect(listVideos.length).toBeGreaterThan(1);
});
