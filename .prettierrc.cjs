module.exports = {
	useTabs: true,
	singleQuote: true,
	semi: true,
	trailingComma: 'es5',
	tabWidth: 2,
	printWidth: 100,
	bracketSameLine: true,
	plugins: ['prettier-plugin-svelte', import('prettier-plugin-tailwindcss')],
	tailwindConfig: './tailwind.config.ts',
	overrides: [{ files: '*.svelte', options: { parser: 'svelte' } }],
};
