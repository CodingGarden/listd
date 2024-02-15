import type { Translation } from '../i18n-types';
import en from '../en';

const de: Translation = {
	...(en as Translation),
	message: 'Bonjour le monde',
	onboarding: {
		labels: {
			uploadFile: 'Uploader un fichier',
			username: "Nom d'utilisateur",
		},
		messages: {
			avatar: 'Choisissez un avatar',
			final: "C'est tout! C'est parti!",
			main: 'Bienvenue sur listd! Configurons votre profil.',
		},
	},
	signUp: "S'inscrire avec YouTube",
	tagline:
		"Présentation de l'expérience YouTube ultime. Que vous recherchiez de nouveaux contenus à regarder ou que vous souhaitiez partager votre propre liste avec vos amis, notre application vous couvre.",
};

export default de;
