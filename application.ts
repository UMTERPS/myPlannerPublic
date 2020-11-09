import { app, BrowserWindow } from 'electron';
import path from 'path';
import registerIpcListeners from './electron/services/IpcMainService';
import layoutConstants from './constants/LayoutConstants';
import Logger from './electron/logger';

const _USER_HOME_DIRECTORY = require('os').homedir();
const _SAVE_AFTER_PUSH = true;
const _HUMAN_READABLE = false;
const _SEPARATOR = '/';
const _DB_PATHS = {
  win32: '/AppData/Local/MyPlanner',
  darwin: '/Library/Application Support/MyPlanner',
  linux: 'MyPlanner'
};
const isDev = process.env.NODE_ENV !== 'production';

const logger = Logger.getLogger();
logger.info('**************** Application Start ********************');

// register Ipc Main listeners, which handles persistent data changes
registerIpcListeners({
  DBPath: isDev ? '.' : _USER_HOME_DIRECTORY + _DB_PATHS[process.platform],
  saveAfterPush: _SAVE_AFTER_PUSH,
  humanReadable: _HUMAN_READABLE,
  separator: _SEPARATOR
});

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

function createWindow() {
  logger.info('Creating window');
  // Creating the browser window.
  win = new BrowserWindow({
    minHeight: layoutConstants.AppMinHeight,
    minWidth: layoutConstants.AppMinWidth,
    height: layoutConstants.AppDefaultHeight,
    width: layoutConstants.AppDefaultWidth,
    webPreferences: {
      nodeIntegration: true
    }
  });

  // load index html
  win.loadURL(
    'file://' + path.resolve(app.getAppPath(), 'build', 'index.html')
  );

  win.on('reload', event => {
    event.preventDefault();
    return;
  });

  // Open the DevTools.
  // win.webContents.openDevTools();

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    logger.info('--------------------- Application Stop ---------------------');
    win = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
  }
});
