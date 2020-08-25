import { updateSettings } from './../../services/SettingsService';
import { UPDATE_LOCALE, UPDATE_THEME } from './actionTypes';

export interface ILocalePayload {
  locale: string;
}

export const updateLocale = (locale: string) => {
  return dispatch => {
    return updateSettings({ locale }).then(() => {
      dispatch({ type: UPDATE_LOCALE, payload: { locale } });
    });
  };
};

export const updateTheme = (theme: string) => {
  return dispatch => {
    return updateSettings({ theme }).then(() => {
      dispatch({ type: UPDATE_THEME, payload: { theme } });
    });
  };
};
