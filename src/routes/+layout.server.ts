import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals }) => ({
	locale: locals.locale,
})) satisfies LayoutServerLoad;
