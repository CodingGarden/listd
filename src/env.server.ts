import { z } from 'zod';
import { ColorScheme, type ColorScheme as ColorSchemeType } from '@prisma/client';
import * as environmentVariables from '$env/static/private';

const colorSchemeKeys: ColorSchemeType[] = Object.keys(ColorScheme) as ColorSchemeType[];
const colorSchemeEnum: [ColorSchemeType, ...ColorSchemeType[]] = [
	colorSchemeKeys[0],
	...colorSchemeKeys.slice(1),
];

const envScheme = z.object({
	AUTH_SECRET: z.string(),
	GOOGLE_CLIENT_ID: z.string(),
	GOOGLE_CLIENT_SECRET: z.string(),
	DB_HOST: z.string(),
	DB_USER: z.string(),
	DB_PASSWORD: z.string(),
	DB_NAME: z.string(),
	DB_PORT: z.string(),
	DATABASE_URL: z.string(),
	COLORSCHEME_DEFAULT: z.enum(colorSchemeEnum),
});

export default envScheme.parse(environmentVariables);
