import type { Translation } from '../i18n-types';
import en from '../en';

const es: Translation = {
	...(en as Translation),
	message: 'Hola Mundo',
};

export default es;
