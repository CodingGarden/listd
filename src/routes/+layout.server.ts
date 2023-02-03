import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals }) => {
  return {
    locale: locals.locale,
  };
}) satisfies LayoutServerLoad;