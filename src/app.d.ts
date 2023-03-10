// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

import type { Session } from '@auth/core/types';

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			session: Session;
			locale: import('$lib/i18n/i18n-types.js').Locales;
		}
		// interface PageData {}
		// interface Platform {}
	}
}
