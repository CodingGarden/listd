import type { Translation } from '../i18n-types';
import en from '../en';

const ru: Translation = {
	...(en as Translation),
	message: 'Привет Мир',
};

export default ru;
