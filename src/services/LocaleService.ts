import {
  setLocale as doSetLocale,
  getLocale as doGetLocale
} from '../providers/IpcRendererProvider';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import zh from '../locales/zh';
import en from '../locales/en';
// import 'ckeditors/build/translations/en';
import 'ckeditors/build/translations/zh-cn';

export const setLocale = (locale: string): void => {
  doSetLocale(locale).then(locale => {
    return locale;
  });
};

export const getLocale = async () => {
  const ret = await doGetLocale();
  return ret;
};

export default locale => {
  i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
      resources: {
        en,
        zh
      },
      lng: locale,
      fallbackLng: 'en',
      interpolation: {
        escapeValue: false
      }
    });
};
