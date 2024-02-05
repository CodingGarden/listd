import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-auto';
import nodeAdapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: [
		vitePreprocess(),
		preprocess({
			postcss: true,
		}),
	],

	kit: {
		// eslint-disable-next-line no-extra-boolean-cast
		adapter: !!process.env.NODE_BUILD ? nodeAdapter() : adapter(),
	},
};

export default config;
