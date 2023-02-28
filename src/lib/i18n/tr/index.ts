import type { Translation } from '../i18n-types';
import en from '../en';
import listd from './listd.json';
import onboarding from './onboarding.json';

const tr: Translation = {
	...(en as Translation),
	...listd,
	onboarding,
};

export default tr;
