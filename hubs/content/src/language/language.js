/* eslint-disable import/no-anonymous-default-export */
import i18n from "i18next";
import Backend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

import en from "./locales/en.json";
import ko from "./locales/ko.json";

const LANGUAGES = {
  EN: "en",
  KO: "ko"
};

const defaultLanguage = LANGUAGES.EN;

// the translations
const resources = {
  en: {
    translation: en
  },
  ko: {
    translation: ko
  }
};

const setLanguage = lang => {
  if (!lang) {
    lang = window.localStorage.getItem("_language") || defaultLanguage;
  }
  window.localStorage.setItem("_language", lang);
  i18n.changeLanguage(lang);
};

const getLanguage = () => {
  const lang = window.localStorage.getItem("_language") || defaultLanguage;
  return lang;
};

i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: getLanguage(),
    debug: true,
    interpolation: {
      escapeValue: false // not needed for react as it escapes by default
    }
  });

export default {
  i18n,
  setLanguage,
  getLanguage,
  LANGUAGES
};
