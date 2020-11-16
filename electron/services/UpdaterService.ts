import { isDev } from './../utils';
import { DataStoreManager } from '../managers';
import Logger from '../logger';
import { app } from 'electron';
import { Version, getLocalVersion, getRemoteVersion } from './VersionService';
import { axiosClient } from './AxiosClient';
import rimraf from 'rimraf';
import fs from 'original-fs';
import path from 'path';

const _USER_HOME_DIRECTORY = require('os').homedir();
const _TEMP_PATH = {
  win32: '/AppData/Local/MyPlanner/tmp',
  darwin: '/Library/Application Support/MyPlanner/tmp',
  linux: 'MyPlanner/tmp'
};
const logger = Logger.getLogger();
const _UPDATER_STATUS = 'UpdaterStatus';

export declare type updaterType = 'None' | 'Reinstall' | 'Feature' | 'Patch';

export class Updater {
  private _updaterType: updaterType;
  private _tempPath: string;
  private _tempASAR: string;
  private _tempStatus: string;
  public _remoteVersion: Version | undefined;
  public _localVersion: Version;

  constructor(localVersion?: Version) {
    this._remoteVersion = undefined;
    this._localVersion = localVersion || getLocalVersion();
    this._updaterType = 'None';
    this._tempPath = '';
    this._tempASAR = '';
    this._tempStatus = '';
  }

  init = async () => {
    if (isDev) {
      logger.debug('dev build, skip updater...');
      this._updaterType = 'None';
      return;
    }

    logger.info('initializing updater...');
    this._tempPath = path.join(
      _USER_HOME_DIRECTORY,
      _TEMP_PATH[process.platform]
    );

    this._tempASAR = path.join(this._tempPath, 'update.asar');
    this._tempStatus = path.join(this._tempPath, 'Status.json');
    const remoteVersion = await this.getRemoteVersion();

    if (remoteVersion.major > this._localVersion.major) {
      // Direct the user to download page and reinstall the entire application.
      this._updaterType = 'Reinstall';
    } else if (remoteVersion.minor > this._localVersion.minor) {
      // download new asar and prompt to reload the application
      this._updaterType = 'Feature';
    } else if (remoteVersion.patch > this._localVersion.patch) {
      // sliently download new asar without any prompt, should be unnoticable bug fix only
      this._updaterType = 'Patch';
    }
  };

  downloadPatch = async () => {
    logger.info('cleaning up temporary directory...');
    try {
      // for electron only. Temporarily, to NOT treat asar file differently.
      // After directory is cleared, change the setting back.
      // ref: https://github.com/jprichardson/node-fs-extra/issues/674#issuecomment-698425138
      process.noAsar = true;
      rimraf.sync(this._tempPath + '/');
      process.noAsar = false;
    } catch (e) {
      logger.error(e);
    }

    const statusStore = DataStoreManager.createDataStore(
      _UPDATER_STATUS,
      this._tempStatus
    );
    statusStore.push('/localVersion', this._localVersion);
    statusStore.push('/remoteVersion', this._remoteVersion);
    statusStore.push('/downloadFinished', false);
    logger.info('downloading patch...');

    try {
      const response = await axiosClient.get('/app.asar', {
        responseType: 'stream'
      });
      if (!fs.existsSync(this._tempPath)) {
        fs.mkdirSync(this._tempPath);
      }
      response.data.pipe(fs.createWriteStream(path.join(this._tempASAR)));
      statusStore.push('/downloadFinished', true);
    } catch (error) {
      logger.error(error);
    }
  };

  updateApp = () => {
    if (this._shouldUpdate()) {
      const targetFile = path.resolve(app.getAppPath(), '../app.asar');
      logger.info(
        `New version [${this._remoteVersion?.version}] detected, local version [${this._localVersion.version}]. updating... `
      );
      fs.copyFileSync(this._tempASAR, targetFile);
      this._localVersion = getLocalVersion();
      logger.info(
        `Update finished successfully. Current version is now ${this._localVersion.version}`
      );
    }
  };

  hasRemoteUpdate = () =>
    this._updaterType === 'Feature' || this._updaterType === 'Patch';

  needUpdate = () => this._updaterType !== 'None';

  getRemoteVersion = async (): Promise<Version> => {
    if (!this._remoteVersion) {
      this._remoteVersion = await getRemoteVersion();
    }
    return this._remoteVersion;
  };

  private _shouldUpdate = (): boolean => {
    if (fs.existsSync(this._tempASAR) && fs.existsSync(this._tempStatus)) {
      let statusStore = DataStoreManager.getDataStore(_UPDATER_STATUS);
      if (!statusStore) {
        statusStore = DataStoreManager.createDataStore(
          _UPDATER_STATUS,
          this._tempStatus
        );
      }

      if (statusStore.getData('/downloadFinished') && this.needUpdate()) {
        return true;
      }
    }
    return false;
  };
}
