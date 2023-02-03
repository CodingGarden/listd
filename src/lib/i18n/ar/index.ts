import type { Translation } from '../i18n-types';
import en from '../en';

const ar: Translation = {
	...(en as Translation),
	message: 'مرحبا بالعالم',
};

export default ar;
