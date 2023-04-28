/* eslint-disable global-require */
/* eslint-disable @typescript-eslint/no-var-requires */

/** @type {import('tailwindcss').Config} */
const config = {
	darkMode: 'class',
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		require('path').join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}'),
	],

	theme: {
		extend: {},
	},

	plugins: [
		require('@tailwindcss/forms'),
		// TODO: remove this ignore
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		...require('@skeletonlabs/skeleton/tailwind/skeleton.cjs')(),
	],
};

module.exports = config;
