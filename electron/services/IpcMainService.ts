import { ipcMain } from 'electron';
import ipcConstants from '../../constants/IPCContants';
import { JsonDB } from 'node-json-db';

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
    const _keys = keys && keys instanceof Array ? keys : new Array(keys);
    const results = {};
    try {
      _keys.forEach(key => {
        try {
          const _result = db.getData('/' + key);
          results[key] = _result;
        } catch (error) {
          if (error.id === ipcConstants.DATA_NOT_FOUND) {
            results[key] = '';
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

  ipcMain.on(ipcConstants.UPDATE_SETTINGS, (event, _token, settings) => {
    Object.keys(settings).forEach(key => {
      db.push('/settings/' + key, settings[key]);
    });
    event.sender.send(
      `${ipcConstants.UPDATE_SETTINGS + _token}_SUCCESS`,
      settings
    );
  });

  ipcMain.on(ipcConstants.GET_SETTINGS, (event, _token) => {
    let settings: Object;
    try {
      settings = db.getData('/' + 'settings');
    } catch (error) {
      if (error.id === ipcConstants.DATA_NOT_FOUND) {
        // If no settings found, init it with default values
        settings = {
          locale: '',
          theme: ''
        };
        db.push('/settings', settings);
      } else {
        throw error;
      }
    }
    event.sender.send(
      `${ipcConstants.GET_SETTINGS + _token}_SUCCESS`,
      settings
    );
  });
};

export default registerIpcListeners;
