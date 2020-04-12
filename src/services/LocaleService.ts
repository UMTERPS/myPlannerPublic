import {
  setLocale as doSetLocale,
  getLocale as doGetLocale
} from '../providers/IpcRendererProvider';
// import 'ckeditors/build/translations/en';
import 'ckeditors/build/translations/zh';

export const setLocale = (locale: string): void => {
  doSetLocale(locale).then((locale) => {
    return locale;
  });
};

export const getLocale = async () => {
  const ret = await doGetLocale().then((locale) => {
    return locale;
  });
  return ret;
};
