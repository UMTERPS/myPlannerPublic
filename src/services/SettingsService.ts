import { ISettingsState, ISettingsUpdater } from './../types/commonTypes';
import {
  getSettings as doGetSettings,
  updateSettings as doUpdateSettings
} from '../providers/IpcRendererProvider';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import resources from '../locales';
import 'ckeditors/build/translations/zh-cn';

export const getSettings = async (): Promise<ISettingsState> => {
  return doGetSettings();
};

export const updateSettings = async (
  settings: ISettingsUpdater
): Promise<ISettingsUpdater> => {
  return doUpdateSettings(settings);
};

export const initI18n = locale => {
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
