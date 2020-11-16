import { app, BrowserWindow } from 'electron';
import layoutConstants from '../../constants/LayoutConstants';
import log4js from 'log4js';
import Logger from '../logger';
import path from 'path';

interface CurrentBrowserWindow {
  [key: string]: BrowserWindow;
}

interface BrowserWindowOption {
  entryPoint: string;
}

export class BrowserWindowsManager {
  private static currentBrowserWindows: CurrentBrowserWindow = {};
  private static logger: log4js.Logger = Logger.getLogger();
  private constructor() {}

  public static getWindow(id: string): BrowserWindow {
    return this.currentBrowserWindows[id];
  }

  public static closeWindow(id: string): void {
    if (this.currentBrowserWindows[id]) {
      this.currentBrowserWindows[id].close();
      delete this.currentBrowserWindows[id];
    }
  }

  public static createNewWindow(id: string, options?: BrowserWindowOption) {
    options = Object.assign(
      {
        entryPoint:
          'file://' + path.resolve(app.getAppPath(), 'build', 'index.html')
      },
      options
    );

    // Creating the browser window.
    this.logger.info('Creating window');
    let win: BrowserWindow = new BrowserWindow({
      minHeight: layoutConstants.AppMinHeight,
      minWidth: layoutConstants.AppMinWidth,
      height: layoutConstants.AppDefaultHeight,
      width: layoutConstants.AppDefaultWidth,
      webPreferences: {
        nodeIntegration: true
      }
    });

    win.on('closed', () => {
      this.logger.info(
        `--------------------- Window [${id}] Closed ---------------------`
      );
      delete this.currentBrowserWindows[id];
    });

    // close current window if exist
    this.closeWindow(id);

    // update reference
    this.currentBrowserWindows[id] = win;

    // load index html
    win.loadURL(options.entryPoint);
  }
}
