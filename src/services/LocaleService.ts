import {
  setLocale as doSetLocale,
  getLocale as doGetLocale
} from '../providers/IpcRendererProvider';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import resources from '../locales';

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
      resources,
      lng: locale,
      fallbackLng: 'en',
      interpolation: {
        escapeValue: false
      }
    });
};
