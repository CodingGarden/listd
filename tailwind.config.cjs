/* eslint-disable global-require */
/* eslint-disable @typescript-eslint/no-var-requires */

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
		...require('@skeletonlabs/skeleton/tailwind/skeleton.cjs')(),
		require('@tailwindcss/forms'),
	],
};

module.exports = config;
