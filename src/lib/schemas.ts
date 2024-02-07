import { Visibility } from '@prisma/client';
import { z } from 'zod';
import type { TranslationFunctions } from '$/lib/i18n/i18n-types.js';

export const createListSchema = ($LL: TranslationFunctions) =>
	z.object({
		title: z.string().trim().min(1, $LL.errors.titleRequired()),
		description: z.string().trim().min(1, $LL.errors.descriptionRequired()).optional(),
		visibility: z.nativeEnum(Visibility).default(Visibility.Unlisted),
		channelIds: z.array(z.string().trim().min(1)).min(1, $LL.errors.listMinLength()),
	});

export type ListSchema = ReturnType<typeof createListSchema>;
