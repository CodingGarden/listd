import type { Locale, PrismaClient } from '@prisma/client';
// Source: https://www.localeplanet.com/icu/
// Code: https://gist.github.com/w3cj/a8215fe403164a248492f2ec63beb9a3
// manually removed POSIX en
// manually removed 001, 150 and 419 locales
import data from './data/locales.json' assert { type: 'json' };

export async function seed(prismaClient: PrismaClient) {
	await prismaClient.$executeRawUnsafe(`TRUNCATE TABLE "Locale" CASCADE;`);
	await prismaClient.locale.createMany({
		data: data.map<Locale>((locale) => {
			const [languageCode, ...parts] = locale.id.split('_');
			let countryCode = parts[0] || null;
			let script: string | null = null;
			if (countryCode && countryCode.length > 2) {
				countryCode = null;
				[script] = parts;
			}
			if (parts.length === 2) {
				[script, countryCode] = parts;
			}
			return {
				id: locale.id.replaceAll('_', '-'),
				formalName: locale.formalName,
				commonName: locale.commonName || null,
				nativeName: locale.nativeName,
				languageCode,
				countryCode,
				script,
			};
		}),
	});
}
