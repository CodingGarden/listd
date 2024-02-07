import { Visibility } from '@prisma/client';
import { z } from 'zod';
import type { TranslationFunctions } from '$/lib/i18n/i18n-types.js';

export const createListSchema = ($LL: TranslationFunctions) =>
	z.object({
		id: z.string().uuid().optional(),
		title: z.string().trim().min(1, $LL.errors.titleRequired()),
		slug: z
			.string()
			.trim()
			.min(1, $LL.errors.slugRequired())
			.max(2048)
			.regex(/([0-9a-z]|-)+/g, $LL.errors.slugSpecialCharacters())
			.refine((slug) => slug.toLowerCase()),
		description: z.string().trim().min(1, $LL.errors.descriptionRequired()).optional(),
		visibility: z.nativeEnum(Visibility).default(Visibility.Unlisted),
		channelIds: z.array(z.string().trim().min(1)).min(1, $LL.errors.listMinLength()),
	});

export type ListSchema = ReturnType<typeof createListSchema>;
