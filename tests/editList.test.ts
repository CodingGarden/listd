import { expect, test } from './baseFixtures';
import data from '../prisma/seeds/data/test.json' assert { type: 'json' };
import { loginTestUser, L, UserTypes } from './utils';

test.beforeEach(async ({ context }) => {
	await loginTestUser(context, UserTypes.hasList);
});

test('onboarded user can edit their own list', async ({ page }) => {
	await page.goto('/');
	await page.waitForSelector('.video-grid');
	await page.locator('.video-grid a').first().click();
	const listId = data.users[UserTypes.hasList]?.list?.[0].id;
	await page.waitForURL(`**/list/${listId}`);
	page.getByRole('link', { name: L.en.buttons.edit(), exact: true }).first().click();
	await page.waitForURL(`**/edit/${listId}`);

	const updatedTitle = 'Coding Garden Universe Updated';
	const titleInput = page.getByLabel(L.en.labels.title());
	await titleInput.click();
	await titleInput.fill(updatedTitle);

	await page.getByRole('button', { name: L.en.buttons.update() }).first().click();

	await page.waitForURL(`**/list/${listId}`);

	const listTitle = page.getByTestId('list-title').first();
	expect(await listTitle.textContent()).toBe(updatedTitle);
});
