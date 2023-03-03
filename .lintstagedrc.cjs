module.exports = {
	'**/*.{js,ts,cjs,svelte,tsx}': [() => 'tsc -p tsconfig.json --noEmit', 'eslint'],
};
