const { ipcMain } = require('electron');
const ipcConstants = require('../../constants/IPCContants');
const _ = require('lodash');

module.exports = function registerIpcListeners(db) {
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
    const _keys = _.isArray(keys) ? keys : new Array(keys);
    const results = {};
    try {
      _.each(_keys, key => {
        try {
          const _result = db.getData('/' + key);
          _.extend(results, { [key]: _result });
        } catch (error) {
          if (error.id === ipcConstants.DATA_NOT_FOUND) {
            _.extend(results, { [key]: '' });
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
};
