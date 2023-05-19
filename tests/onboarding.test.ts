import { expect, test } from './baseFixtures.ts';
import { loginTestUser } from './utils.ts';

test.beforeEach(async ({ context }) => {
	await loginTestUser(context);
});

test('new user redirects to the onboarding page', async ({ page }) => {
	await page.goto('/');
	expect(page.url()).toContain('/onboarding');
});

test('new user redirected to homepage after onboarding', async ({ page }) => {
	await page.goto('/onboarding');
	// TODO: replace with translated string after imports are working
	await page.getByRole('button', { name: 'Lets Go!' }).click();
	expect(page.url()).toContain('/');
});
