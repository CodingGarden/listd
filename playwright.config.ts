import type { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
	webServer: {
		command: `dotenv npm run build && dotenv npm run preview`,
		port: 4173,
	},
	testDir: 'tests',
};

export default config;
