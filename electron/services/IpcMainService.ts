import { ipcMain } from 'electron';
import ipcConstants from '../../constants/IPCContants';
import { isArray, extend, each } from 'lodash';
import { JsonDB } from 'node-json-db';
import { getEnvLocale } from './LocaleService';

const registerIpcListeners = (db: JsonDB): void => {
  ipcMain.on(ipcConstants.UPDATE_CONTENT, (event, _token, key, value) => {
    try {
      db.push('/' + key, value);
      event.sender.send(`${ipcConstants.UPDATE_CONTENT + _token}_SUCCESS`, {
        [key]: value
      });
    } catch (error) {
      event.sender.send(
        `${ipcConstants.UPDATE_CONTENT + _token}_FAILED`,
        'Failed to update data'
      );
    }
  });

  ipcMain.on(ipcConstants.FETCH_CONTENT, (event, _token, keys) => {
    const _keys = isArray(keys) ? keys : new Array(keys);
    const results = {};
    try {
      each(_keys, key => {
        try {
          const _result = db.getData('/' + key);
          extend(results, { [key]: _result });
        } catch (error) {
          if (error.id === ipcConstants.DATA_NOT_FOUND) {
            extend(results, { [key]: '' });
          } else {
            throw error;
          }
        }
      });

      event.sender.send(
        `${ipcConstants.FETCH_CONTENT + _token}_SUCCESS`,
        results
      );
    } catch (error) {
      event.sender.send(
        `${ipcConstants.FETCH_CONTENT + _token}_FAILED`,
        'Failed to fetch data!'
      );
    }
  });

  ipcMain.on(ipcConstants.SET_LOCALE, (event, _token, locale) => {
    // FIXME! Not implemented
    console.log(locale);
    event.sender.send(`${ipcConstants.SET_LOCALE + _token}_SUCCESS`, locale);
  });

  ipcMain.on(ipcConstants.GET_LOCALE, (event, _token) => {
    const locale = getEnvLocale();
    event.sender.send(`${ipcConstants.GET_LOCALE + _token}_SUCCESS`, locale);
  });
};

export default registerIpcListeners;
