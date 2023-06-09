import { expect, test } from './baseFixtures';
import { loginTestUser, L, UserTypes } from './utils';

test.beforeEach(async ({ context }) => {
	await loginTestUser(context, UserTypes.new);
});

test('new user redirects to the onboarding page', async ({ page }) => {
	await page.goto('/');
	expect(page.url()).toContain('/onboarding');
});

test('new user redirected to homepage after onboarding', async ({ page }) => {
	await page.goto('/onboarding');
	await page.getByRole('button', { name: L.en.pages.onboarding.buttons.letsGo() }).click();
	expect(page.url()).toContain('/');
});
