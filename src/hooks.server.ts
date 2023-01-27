import type { Handle } from '@sveltejs/kit';
import { initAcceptLanguageHeaderDetector } from 'typesafe-i18n/detectors';
 
export const handle = (async ({ event, resolve }) => {
  // TODO: get lang from cookie / user setting
  event.locals.lang = initAcceptLanguageHeaderDetector(event.request)();  
 
  // TODO: set lang attribute in HTML
  return resolve(event);
}) satisfies Handle;