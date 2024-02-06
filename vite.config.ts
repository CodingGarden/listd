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
} else {
	plugins.push({
		name: 'remove-testids',
		enforce: 'pre',
		transform(code, id) {
			if (id.endsWith('.svelte')) {
				return code.replace(/data-testid=".*?"/g, '');
			}
			return code;
		},
	});
}

const config: UserConfig = {
	plugins,
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}'],
	},
	server: {
		host: '0.0.0.0',
	},
	resolve: {
		alias: {
			$: resolve('./src'),
			'.prisma/client/index-browser': './node_modules/.prisma/client/index-browser.js',
		},
	},
};

export default config;
