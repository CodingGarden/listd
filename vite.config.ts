import { sveltekit } from '@sveltejs/kit/vite';
import type { PluginOption, UserConfig } from 'vite';
import { resolve } from 'path';
import istanbul from 'vite-plugin-istanbul';

const plugins: PluginOption[] = [sveltekit()];

if (process.env.NODE_ENV?.toLowerCase() === 'test') {
	plugins.push(
		istanbul({
			include: ['src/**/*.ts', 'src/**/*.js', 'src/**/*.svelte'],
			exclude: ['node_modules', 'tests/'],
			extension: ['.js', '.ts', '.svelte'],
			requireEnv: false,
			forceBuildInstrument: true,
			nycrcPath: './.nycrc.json',
		})
	);
}

const config: UserConfig = {
	plugins,
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}'],
	},
	resolve: {
		alias: {
			$: resolve('./src'),
			'.prisma/client/index-browser': './node_modules/.prisma/client/index-browser.js',
		},
	},
};

export default config;
