import { ISettingsState, ISettingsUpdater } from './../types/commonTypes';
import { ipcRenderer as ipc } from 'electron';
import ipcConstants from '../../constants/IPCContants';

export const _generateEventToken = (length: number = 16): string => {
  let random_string = '';
  let random_ascii;
  for (let i = 0; i < length; i++) {
    random_ascii = Math.floor(Math.random() * 25 + 97);
    random_string += String.fromCharCode(random_ascii);
  }
  return random_string.toUpperCase();
};

export const updateContent = (key: string, value: string): Promise<void> => {
  const _token = _generateEventToken();
  ipc.send(ipcConstants.UPDATE_CONTENT, _token, key, value);
  return new Promise((resolve, reject) => {
    ipc.once(
      `${ipcConstants.UPDATE_CONTENT + _token}_SUCCESS`,
      (event, response) => {
        return resolve(response);
      }
    );
    ipc.once(
      `${ipcConstants.UPDATE_CONTENT + _token}_FAILED`,
      (event, response) => {
        return reject(response);
      }
    );
  });
};

export const fetchContentByUdids = (
  udids: string | [string]
): Promise<string> => {
  const _token = _generateEventToken();
  ipc.send(ipcConstants.FETCH_CONTENT, _token, udids);
  return new Promise((resolve, reject) => {
    ipc.once(
      `${ipcConstants.FETCH_CONTENT + _token}_SUCCESS`,
      (event, response) => {
        resolve(response);
      }
    );
    ipc.once(
      `${ipcConstants.FETCH_CONTENT + _token}_FAILED`,
      (event, response) => {
        reject(response);
      }
    );
  });
};

export const updateSettings = (
  settings: ISettingsUpdater
): Promise<ISettingsUpdater> => {
  const _token = _generateEventToken();
  ipc.send(ipcConstants.UPDATE_SETTINGS, _token, settings);
  return new Promise((resolve, reject) => {
    ipc.once(
      `${ipcConstants.UPDATE_SETTINGS + _token}_SUCCESS`,
      (event, response) => {
        resolve(response);
      }
    );
    ipc.once(
      `${ipcConstants.UPDATE_SETTINGS + _token}_FAILED`,
      (event, response) => {
        reject(response);
      }
    );
  });
};

export const getSettings = (): Promise<ISettingsState> => {
  const _token = _generateEventToken();
  ipc.send(ipcConstants.GET_SETTINGS, _token);
  return new Promise((resolve, reject) => {
    ipc.once(
      `${ipcConstants.GET_SETTINGS + _token}_SUCCESS`,
      (event, response) => {
        resolve(response);
      }
    );
    ipc.once(
      `${ipcConstants.GET_SETTINGS + _token}_FAILED`,
      (event, response) => {
        reject(response);
      }
    );
  });
};
