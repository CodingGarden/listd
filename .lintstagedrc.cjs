module.exports = {
	// TODO: only run svelte-check for changed files...
	'**/*.{js,ts,cjs,svelte,tsx}': [() => 'npm run check', 'eslint'],
};
