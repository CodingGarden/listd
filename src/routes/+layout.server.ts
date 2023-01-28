import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals }) => {
	return {
		lang: locals.lang
	};
}) satisfies LayoutServerLoad;
