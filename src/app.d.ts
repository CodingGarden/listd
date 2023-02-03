// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

// and what to do when importing types
declare namespace App {
	// interface Error {}
	interface Locals {
		locale: import('$lib/i18n/i18n-types.js').Locales;
	}
	// interface PageData {}
	// interface Platform {}
}
