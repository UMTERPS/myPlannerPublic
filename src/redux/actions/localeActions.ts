import { setLocale } from './../../services/LocaleService';
import { UPDATE_LOCALE } from './actionTypes';

export interface ILocalePayload {
  locale: string;
}

export const updateLocale = (data: ILocalePayload) => {
  return dispatch => {
    const _locale = data.locale;
    return setLocale(_locale).then(() => {
      dispatch({ type: UPDATE_LOCALE, payload: { locale: _locale } });
    });
  };
};
