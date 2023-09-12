import type { Translation } from '../i18n-types';
import en from '../en';

const de: Translation = {
	...(en as Translation),
	message: 'Hallo Welt',
	buttons: {
		create: 'Erstellen',
		edit: 'Bearbeiten',
		update: 'Ändern',
		logOut: 'Logout',
		loginYouTube: 'Mit YouTube einloggen',
	},
	labels: {
		title: 'Titel',
		description: 'Beschreibung',
		visibility: 'Sichtbarkeit',
		views: '{0} Aufrufe',
		filter: 'Filter',
	},
	enums: {
		visibility: {
			Public: 'Öffentlich',
			Unlisted: 'nicht gelistet',
			Private: 'Privat',
		} satisfies VisibilityTranslation,
	},
	errors: {
		titleRequired: 'Der Titel kann nicht leer sein.',
		descriptionRequired: 'Die Beschreibung kann nicht leer sein.',
		notFound: 'nicht gefunden.',
	},
	messages: {
		pleaseWait: 'Bitte warten...',
	},
	pages: {
		root: {
			loggedIn: {
				messages: {
					createList: 'Drücke auf Erstellen um zu starten.',
				},
			},
			messages: {
				tagline:
					"Präsentiert das ultimative YouTube-Erlebnis. Egal, ob du auf der Suche nach neuen Inhalten zum Ansehen bist oder deine eigene kuratierte Liste mit Freunden teilen möchtest, unsere App ist genau das Richtige für dich.",
			},
		},
		onboarding: {
			buttons: {
				letsGo: 'Los gehts!',
			},
			labels: {
				username: 'Username',
				uploadFile: 'Datei hochladen',
			},
			messages: {
				main: "Willkommen auf listd! Lass uns dein Profil einrichten.",
				avatar: 'Lade deinen Avatar hoch.',
				final: "Das war alles! Fangen wir an",
			},
		},
		create: {
			labels: {
				channelSearch: 'Channel suche',
			},
			messages: {
				channelSearch: 'Such nach einem Channel...',
			},
		},
	},
};

export default de;
