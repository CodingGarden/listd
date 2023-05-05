import type { Visibility } from '@prisma/client';
import type { BaseTranslation } from '../i18n-types';

type VisibilityTranslation = {
	[key in Visibility]: string;
};

const en: BaseTranslation = {
	message: 'Hello World',
	buttons: {
		create: 'Create',
		update: 'Update',
		logOut: 'Logout',
		loginYouTube: 'Login with YouTube',
	},
	labels: {
		title: 'Title',
		description: 'Description',
		visibility: 'Visibility',
		views: '{0} views',
	},
	enums: {
		visibility: {
			Public: 'Public',
			Unlisted: 'Unlisted',
			Private: 'Private',
		} satisfies VisibilityTranslation,
	},
	errors: {
		titleRequired: 'Title cannot be empty.',
		descriptionRequired: 'Description cannot be empty.',
		notFound: 'Not found.',
	},
	messages: {
		pleaseWait: 'Please wait...',
	},
	pages: {
		root: {
			loggedIn: {
				messages: {
					createList: 'Click Create to get started.',
				},
			},
			messages: {
				tagline:
					"Presenting the ultimate YouTube experience. Whether you're looking for new content to watch or want to share your own curated list with friends, our app has got you covered.",
			},
		},
		onboarding: {
			labels: {
				username: 'Username',
				uploadFile: 'Upload File',
			},
			messages: {
				main: "Welcome to listd! Let's setup your profile.",
				avatar: 'Upload your avatar.',
				final: "That's all! Let's get started!",
			},
		},
		create: {
			labels: {
				channelSearch: 'Channel Search',
			},
			messages: {
				channelSearch: 'Search for a channel...',
			},
		},
	},
};

export default en;
