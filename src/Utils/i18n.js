import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

const Languages = ['ru', 'ua'];

i18n.use(Backend).use(LanguageDetector).use(initReactI18next).init({
    fallbackLng: 'ru',
    debug: false,
    detection:{
        order: ['queryString', 'cookie'],
        cache: ['cookie']
    },
    interpolation:{
        escapeValue: false
    },
    
    whitelist: Languages
});

export default i18n;