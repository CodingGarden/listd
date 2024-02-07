/* eslint-disable max-classes-per-file */
import type { User as OGUser } from '@auth/core/types';
import type { UserSettings } from '@prisma/client';
import { SvelteKitAuthConfig as OGSvelteKitAuthConfig } from '@auth/sveltekit';
import type { CustomAdapter } from '$lib/prisma/client';

declare module '@auth/core/types' {
	interface User extends OGUser {
		settings: UserSettings;
		username: string;
	}
}

declare module '@auth/sveltekit' {
	interface SvelteKitAuthConfig extends OGSvelteKitAuthConfig {
		adapter: CustomAdapter;
	}
}
