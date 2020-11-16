import { configCatSDK } from './config/index';
import { app } from 'electron';
import { registerIpcListeners } from './electron/services';
import Logger from './electron/logger';
import { Updater } from './electron/services';
import { BrowserWindowsManager } from './electron/managers';
import { isDev } from './electron/utils';
import * as configcat from 'configcat-node';

const _USER_HOME_DIRECTORY = require('os').homedir();
const _SAVE_AFTER_PUSH = true;
const _HUMAN_READABLE = false;
const _SEPARATOR = '/';
const _DB_PATHS = {
  win32: '/AppData/Local/MyPlanner',
  darwin: '/Library/Application Support/MyPlanner',
  linux: 'MyPlanner'
};

const _MAIN_WINDOW_ = 'main';

const logger = Logger.getLogger();
logger.info('**************** Application Start ********************');

// register Ipc Main listeners, which handles persistent data changes
registerIpcListeners({
  DBPath: isDev ? '.' : _USER_HOME_DIRECTORY + _DB_PATHS[process.platform],
  saveAfterPush: _SAVE_AFTER_PUSH,
  humanReadable: _HUMAN_READABLE,
  separator: _SEPARATOR
});

const configCatClient = configcat.createClientWithManualPoll(configCatSDK, {
  logger
});

const run = () => {
  configCatClient.forceRefreshAsync().then(async () => {
    const enabled = await configCatClient.getValueAsync(
      'UPDATER_ENABLED',
      false
    );

    if (enabled) {
      const updater = new Updater();
      updater.init().then(() => {
        // This method will be called when Electron has finished
        // initialization and is ready to create browser windows.
        // Some APIs can only be used after this event occurs.

        if (updater.needUpdate()) {
          updater.updateApp();
        }

        BrowserWindowsManager.createNewWindow(_MAIN_WINDOW_);

        // Try to download potential remote update package
        if (updater.hasRemoteUpdate()) {
          updater.downloadPatch();
        }
      });
    } else {
      BrowserWindowsManager.createNewWindow(_MAIN_WINDOW_);
    }
  });
};

app.on('ready', run);

// Quit when all windows are closed.
app.on('window-all-closed', async () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  logger.info('--------------------- Application Stop ---------------------');
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (!BrowserWindowsManager.getWindow(_MAIN_WINDOW_)) {
    BrowserWindowsManager.createNewWindow(_MAIN_WINDOW_);
  }
});
