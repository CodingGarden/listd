import type { Translation } from '../i18n-types';
import en from '../en';

const de: Translation = {
	...(en as Translation),
	tagline:
		'Das ultimative YouTube-Erlebnis. Egal, ob du nach neuen Inhalten suchst oder deine eigene Liste mit Freunden teilen möchtest, unsere App hat alles, was du brauchst.',
	signUp: 'Anmelden mit YouTube',
	message: 'Hallo Welt',
	onboarding: {
		labels: {
			username: 'Benutzername',
			uploadFile: 'Datei hochladen',
			locale: 'Sprache',
			colorScheme: 'Theme',
		},
		messages: {
			main: 'Willkommen bei listd! Lass uns dein Profil einrichten.',
			avatar: 'Laden dein Avatar hoch',
			final: "Das war's schon! Fangen wir an!",
		},
	},
};

export default de;
