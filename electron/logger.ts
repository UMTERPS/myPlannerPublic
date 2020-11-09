import path from 'path';
import { app } from 'electron';
import log4js from 'log4js';

const _LOG_FILE_NAME = 'debug.log';
const _USER_HOME_DIRECTORY = require('os').homedir();
const _LOG_PATHS = {
  win32: '/AppData/Local/MyPlanner',
  darwin: '/Library/Application Support/MyPlanner',
  linux: 'MyPlanner'
};

class Logger {
  private static logger: log4js.Logger;
  private constructor() {}

  public static getLogger(): log4js.Logger {
    if (this.logger) {
      return this.logger;
    } else {
      const isDev = process.env.NODE_ENV !== 'production';
      const fileName = isDev
        ? path.join(app.getAppPath(), _LOG_FILE_NAME)
        : path.join(
            _USER_HOME_DIRECTORY,
            _LOG_PATHS[process.platform],
            _LOG_FILE_NAME
          );

      log4js.configure({
        appenders: {
          MyPlanner: {
            type: 'file',
            filename: fileName,
            maxLogSize: 5242880,
            backups: 3,
            compress: true
          }
        },
        categories: {
          default: { appenders: ['MyPlanner'], level: isDev ? 'trace' : 'info' }
        }
      });
      this.logger = log4js.getLogger('MyPlanner');
      return this.logger;
    }
  }
}

export default Logger;
