import type { Translation } from '../i18n-types';
import en from '../en';

const uk: Translation = {
	...(en as Translation),
	message: 'Привіт світ',
};

export default uk;
