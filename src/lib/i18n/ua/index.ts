import type { Translation } from '../i18n-types';
import en from '../en';

const ua: Translation = {
	...(en as Translation),
	message: 'Привіт Світ',
};

export default ua;
