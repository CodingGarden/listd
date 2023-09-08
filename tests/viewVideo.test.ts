import { expect, test } from './baseFixtures';
import { loginTestUser, UserTypes } from './utils';
import data from '../prisma/seeds/data/test.json' assert { type: 'json' };

test.beforeEach(async ({ context }) => {
	await loginTestUser(context, UserTypes.hasList);
});

test('clicking a video card loads the video page', async ({ page }) => {
	const listId = data.users[UserTypes.hasList]?.list?.[0].id;
	expect(listId).toBeDefined();
	await page.goto(`/list/${listId}`);
	await page.waitForSelector('[data-testid="video-list"]');
	const listVideos = await page.getByTestId('video-list').locator('.card').all();
	expect(listVideos.length).toBeGreaterThan(1);
	await page.getByTestId('video-list').locator('.card').first().click();
	await page.waitForURL(`**/list/${listId}/watch/**`);
	await page.waitForSelector('[data-testid="video-embed"]');
	const videoEmbed = page.getByTestId('video-embed').first();
	await expect(videoEmbed).toBeVisible();
	const videoDescription = page.getByTestId('video-description').first();
	await expect(videoDescription).toBeVisible();
});
