// This is only used by playwright tests. Do not import anywhere else

import type { LocaleTranslationFunctions } from 'typesafe-i18n'
import { i18n, loadedFormatters, loadedLocales, locales } from './i18n-util'
import type { Locales, Translations, TranslationFunctions } from './i18n-types'

import { initFormatters } from './formatters';
import en from './en/index';

loadedLocales['en'] = en as unknown as Translations
loadedFormatters['en'] = initFormatters('en')

export const L: LocaleTranslationFunctions<Locales, Translations, TranslationFunctions> = i18n()

export default L