import { initReactI18next } from "react-i18next";
import i18n from "i18next";
import Backend from "i18next-http-backend";

import en from "./locales/en.js";
import ko from "./locales/ko.js";

// the translations
const resources = {
	en: {
		translation: en,
	},
	ko: {
		translation: ko,
	},
};

i18n
	.use(Backend)
	.use(initReactI18next)
	.init({
		resources,
		fallbackLng: 'ko',
		returnNull: false,
		debug: true,
		interpolation: {
			escapeValue: false, // not needed for react as it escapes by default
		},
	});

export default i18n;