import { expect, test } from './baseFixtures';
import { loginTestUser, L, UserTypes } from './utils';

test.beforeEach(async ({ context }) => {
	await loginTestUser(context, UserTypes.onboarded);
});

test('onboarded user does not get redirected', async ({ page }) => {
	await page.goto('/');
	const url = new URL(page.url());
	expect(url.pathname).toBe('/');
});

test('onboarded user can click to create a list', async ({ page }) => {
	await page.goto('/');
	await page.getByRole('link', { name: L.en.buttons.create() }).click();
	await page.waitForURL(/\/create$/);
	const url = new URL(page.url());
	expect(url.pathname).toBe('/create');
});

test('onboarded user can create a list', async ({ page }) => {
	await page.goto('/create');
	await page.waitForURL(/\/create$/);
	const url = new URL(page.url());
	expect(url.pathname).toBe('/create');

	const titleInput = page.getByLabel(L.en.labels.title());
	await titleInput.click();
	await titleInput.fill('Coding Garden Universe');

	const descriptionInput = page.getByLabel(L.en.labels.description());
	await descriptionInput.click();
	await descriptionInput.fill('All the coding garden channels');

	const searchInput = page.getByPlaceholder(L.en.pages.create.messages.channelSearch());
	await searchInput.click();
	await searchInput.fill('coding garden');
	await searchInput.press('Enter');
	await page.waitForSelector('.results .card');
	await page.locator('.results .card .btn').first().click();
	await page.locator('.results .card .btn').nth(1).click();

	await page.getByRole('button', { name: L.en.buttons.create() }).first().click();

	await page.waitForURL('**/list/**');
});
