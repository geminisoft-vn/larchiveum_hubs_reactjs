import { initReactI18next } from "react-i18next";
import i18n from "i18next";
import Backend from "i18next-http-backend";

import en from "./locales/en.json";
import ko from "./locales/ko.json";

const LANGUAGES = {
	EN: "en",
	KO: "ko",
};

// the translations
const resources = {
	en: {
		translation: en,
	},
	ko: {
		translation: ko,
	},
};

const setLanguage = (lang: string) => {
	let locale = "";
	if (!lang) {
		locale = window.localStorage.getItem("LARCHIVEUM__language") || "en";
	}
	window.localStorage.setItem("LARCHIVEUM__language", locale);
	i18n.changeLanguage(locale);
};

const getLanguage = () => {
	const lang = window.localStorage.getItem("LARCHIVEUM__language") || "en";
	return lang;
};

i18n
	.use(Backend)
	.use(initReactI18next)
	.init({
		resources,
		fallbackLng: getLanguage(),
		returnNull: false,
		debug: true,
		interpolation: {
			escapeValue: false, // not needed for react as it escapes by default
		},
	});

export default i18n;

export { setLanguage, getLanguage, LANGUAGES };
