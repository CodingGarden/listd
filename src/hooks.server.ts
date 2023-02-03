import { detectLocale } from '$lib/i18n/i18n-util.js';
import type { Handle } from '@sveltejs/kit';
import { initAcceptLanguageHeaderDetector } from 'typesafe-i18n/detectors';

export const handle = (async ({ event, resolve }) => {
  // TODO: get lang from cookie / user setting
  const acceptLanguageHeaderDetector = initAcceptLanguageHeaderDetector(event.request);
  event.locals.locale = detectLocale(acceptLanguageHeaderDetector);

  // TODO: set lang attribute in HTML
  return resolve(event);
}) satisfies Handle;