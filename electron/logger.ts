import path from 'path';
import { app } from 'electron';
import log4js from 'log4js';
import { isDev } from './utils';

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
      const fileName = isDev
        ? path.join(app.getAppPath(), _LOG_FILE_NAME)
        : path.join(
            _USER_HOME_DIRECTORY,
            _LOG_PATHS[process.platform],
            _LOG_FILE_NAME
          );
      const appenders = {
        logFile: {
          type: 'file',
          filename: fileName,
          maxLogSize: 5242880,
          backups: 3,
          compress: true
        }
      };
      if (isDev) {
        appenders['console'] = {
          type: 'console'
        };
      }
      log4js.configure({
        appenders,
        categories: {
          default: {
            appenders: isDev ? ['logFile', 'console'] : ['logFile'],
            level: isDev ? 'trace' : 'info'
          }
        }
      });
      this.logger = log4js.getLogger('default');
      return this.logger;
    }
  }
}

export default Logger;
