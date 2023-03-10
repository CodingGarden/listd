import { Visibility } from '@prisma/client';
import { fail } from '@sveltejs/kit';
import { LL, setLocale } from '$lib/i18n/i18n-svelte';
import { get } from 'svelte/store';
import { z, ZodError } from 'zod';
import prismaClient from '$lib/db.server';
import type { Actions } from './$types';

export async function load() {
	return {
		visibility: Visibility,
		visibilities: Object.values(Visibility) as Visibility[],
	};
}

export const actions = {
	default: async (event) => {
		const $LL = get(LL);
		setLocale(event.locals.locale);
		const ListCreateRequestSchema = z.object({
			title: z.string().trim().min(1, $LL.errors.titleRequired()),
			description: z.string().trim().min(1, $LL.errors.descriptionRequired()).optional(),
			visibility: z.nativeEnum(Visibility),
		});
		const formData = await event.request.formData();
		const formDataObject = Object.fromEntries(formData);
		try {
			const validated = await ListCreateRequestSchema.parseAsync(formDataObject);
			const { user } = event.locals.session;
			const inserted = await prismaClient.list.create({
				data: {
					...validated,
					// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
					userId: user!.id,
				},
			});

			return {
				success: true,
				listId: inserted.id,
			};
		} catch (e) {
			const error = e as Error;
			let { message } = error;
			if (error instanceof ZodError) {
				const errorMessages = error.issues.map((issue) => issue.message);
				message = errorMessages.join('\n');
			}
			return fail(400, { error: message });
		}
	},
} satisfies Actions;
