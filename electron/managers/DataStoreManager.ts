import { JsonDB } from 'node-json-db';
import { Config } from 'node-json-db/dist/lib/JsonDBConfig';

type DataStore = JsonDB;

type DataStoreConfig = {
  saveAfterPush?: boolean;
  humanReadable?: boolean;
  separator?: string;
};

interface DataStores {
  [key: string]: DataStore;
}

export class DataStoreManager {
  private static _dss: DataStores = {};

  private constructor() {}

  public static getDataStore(key: string) {
    return this._dss[key];
  }

  public static createDataStore(
    key: string,
    path: string,
    config?: DataStoreConfig
  ) {
    config = Object.assign(
      {
        saveAfterPush: true,
        humanReadable: false,
        separator: '/'
      },
      config
    );

    const { saveAfterPush, humanReadable, separator } = config;
    const dataStore = new JsonDB(
      new Config(path, saveAfterPush, humanReadable, separator)
    );
    this._dss[key] = dataStore;
    return dataStore;
  }
}
