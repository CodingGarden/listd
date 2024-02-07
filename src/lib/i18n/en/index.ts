import type { Visibility } from '@prisma/client';
import type { BaseTranslation } from '../i18n-types';

type VisibilityTranslation = {
	[key in Visibility]: string;
};

const en: BaseTranslation = {
	message: 'Hello World',
	buttons: {
		create: 'Create',
		view: 'View',
		edit: 'Edit',
		update: 'Update',
		logOut: 'Logout',
		loginYouTube: 'Login with YouTube',
		remove: 'Remove',
		add: 'Add',
	},
	labels: {
		title: 'Title',
		slug: 'Slug',
		description: 'Description',
		visibility: 'Visibility',
		views: '{0} views',
		filter: 'Filter',
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
		slugRequired: 'Slug cannot be empty.',
		slugSpecialCharacters: 'Slug cannot contain special characters',
		descriptionRequired: 'Description cannot be empty.',
		notFound: 'Not found.',
		listMinLength: 'A list must have at least 1 channel.',
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
			buttons: {
				letsGo: 'Lets Go!',
			},
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
