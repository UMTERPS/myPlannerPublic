const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

const protocols = require('electron-protocols');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

protocols.register(
  'local',
  protocols.basepath(path.join(app.getAppPath(), 'build'))
);

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    minHeight: 460,
    minWidth: 660,
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });

  // and load the index.html of the app.
  win.loadURL('local://index.html');

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

ipcMain.on('update-content', (event, content) => {
  console.log('ipc main: update-content');
  console.log(content);
  win.webContents.send('content-updated', content);
});
