import { LL, setLocale } from '$/lib/i18n/i18n-svelte';
import prismaClient from '$lib/db.server';
import { error } from '@sveltejs/kit';
import { get } from 'svelte/store';

export async function load({ params, locals }) {
	try {
		// TODO: handle visibility
		const list = await prismaClient.list.findFirst({
			where: {
				id: params.id,
			},
		});
		if (list) {
			return {
				list,
			};
		}
	} catch (e) {
		/* empty */
	}
	setLocale(locals.locale);
	const $LL = get(LL);
	throw error(404, $LL.errors.notFound());
}
