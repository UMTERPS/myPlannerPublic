import {
  setLocale as doSetLocale,
  getLocale as doGetLocale
} from '../providers/IpcRendererProvider';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import resources from '../locales';
import 'ckeditors/build/translations/zh-cn';

export const setLocale = async (locale: string): Promise<string> => {
  const status = await doSetLocale(locale);
  return status;
};

export const getLocale = async (): Promise<string> => {
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
