import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { jaLocales } from '@/i18n/locales/ja';

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  ja: {
    translation: jaLocales,
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'ja', // if you're using a language detector, do not define the lng option
    fallbackLng: 'ja',
    interpolation: {
      escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
  });

export default i18n;
