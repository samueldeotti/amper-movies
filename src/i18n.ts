import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEN from './locales/en.json';
import translationPT from './locales/pt.json';

const savedLanguage = localStorage.getItem('language') || navigator.languages[0];
console.log(savedLanguage);

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: translationEN,
      },
      pt: {
        translation: translationPT,
      },
    },
    lng: savedLanguage.split('-')[0], // Idioma padrão
    fallbackLng: 'en', // Idioma de fallback
    interpolation: {
      escapeValue: false, // Evitar escape automático de HTML
    },
  });

export default i18n;
