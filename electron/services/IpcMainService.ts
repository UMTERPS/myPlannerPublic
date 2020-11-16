import { DataStoreManager } from '../managers';
import { ipcMain } from 'electron';
import ipcConstants from '../../constants/IPCContants';
import path from 'path';

export type ListenerConfig = {
  DBPath: string;
  saveAfterPush: boolean;
  humanReadable: boolean;
  separator: string;
};

const registerIpcListeners = (config: ListenerConfig): void => {
  const { DBPath, saveAfterPush, humanReadable, separator } = config;
  // for personal data;
  // should be encrypted when that functionality is ready
  // should be able to be imported/exported
  const dataDB = DataStoreManager.createDataStore(
    'MyPlanner',
    path.join(DBPath, 'MyPlanner'),
    {
      saveAfterPush,
      humanReadable,
      separator
    }
  );

  // for settings/preferences;
  // don't have to be encrypted
  // optional to be imported/exported
  const prefDB = DataStoreManager.createDataStore(
    'Settings',
    path.join(DBPath, 'Settings'),
    {
      saveAfterPush,
      humanReadable,
      separator
    }
  );

  ipcMain.on(ipcConstants.UPDATE_CONTENT, (event, _token, key, value) => {
    try {
      dataDB.push('/' + key, value);
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
          const _result = dataDB.getData('/' + key);
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
      prefDB.push('/settings/' + key, settings[key]);
    });
    event.sender.send(
      `${ipcConstants.UPDATE_SETTINGS + _token}_SUCCESS`,
      settings
    );
  });

  ipcMain.on(ipcConstants.GET_SETTINGS, (event, _token) => {
    let settings: Object;
    try {
      settings = prefDB.getData('/' + 'settings');
    } catch (error) {
      if (error.id === ipcConstants.DATA_NOT_FOUND) {
        // If no settings found, init it with default values
        settings = {
          locale: '',
          theme: ''
        };
        prefDB.push('/settings', settings);
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

export { registerIpcListeners };
