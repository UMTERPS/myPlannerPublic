import { ipcRenderer as ipc } from 'electron';
import ipcConstants from '../../constants/IPCContants';

const _generateEventToken = (length: number = 16): string => {
  let random_string = '';
  let random_ascii;
  for (let i = 0; i < length; i++) {
    random_ascii = Math.floor(Math.random() * 25 + 97);
    random_string += String.fromCharCode(random_ascii);
  }
  return random_string.toUpperCase();
};

const updateContent = (key: string, value: string): Promise<void> => {
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

const fetchContentByUdids = (udids: string | [string]): Promise<string> => {
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

const setLocale = (locale: string): Promise<string> => {
  const _token = _generateEventToken();
  ipc.send(ipcConstants.SET_LOCALE, _token, locale);
  return new Promise((resolve, reject) => {
    ipc.once(
      `${ipcConstants.SET_LOCALE + _token}_SUCCESS`,
      (event, response) => {
        resolve(response);
      }
    );
    ipc.once(
      `${ipcConstants.SET_LOCALE + _token}_FAILED`,
      (event, response) => {
        reject(response);
      }
    );
  });
};

const getLocale = (): Promise<string> => {
  const _token = _generateEventToken();
  ipc.send(ipcConstants.GET_LOCALE, _token);
  return new Promise((resolve, reject) => {
    ipc.once(
      `${ipcConstants.GET_LOCALE + _token}_SUCCESS`,
      (event, response) => {
        resolve(response);
      }
    );
    ipc.once(
      `${ipcConstants.GET_LOCALE + _token}_FAILED`,
      (event, response) => {
        reject(response);
      }
    );
  });
};

export { updateContent, fetchContentByUdids, setLocale, getLocale };
