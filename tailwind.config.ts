/* eslint-disable global-require */
/* eslint-disable @typescript-eslint/no-var-requires */

import { join } from 'path';
import forms from '@tailwindcss/forms';
import type { Config } from 'tailwindcss';
import { skeleton } from '@skeletonlabs/tw-plugin';

const config: Config = {
	darkMode: 'class',
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}'),
	],

	theme: {
		extend: {},
	},

	plugins: [
		forms,
		skeleton({
			themes: {
				preset: [{ name: 'crimson', enhancements: true }],
			},
		}),
	],
};

export default config;
