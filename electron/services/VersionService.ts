import { isDev } from './../utils';
import { app } from 'electron';
import { axiosClient } from './AxiosClient';

export declare type Version = {
  version: string;
  major: number;
  minor: number;
  patch: number;
  dev?: string;
};

export const getLocalVersionString = (): string | undefined => {
  return isDev ? process.env.npm_package_version : app.getVersion();
};

export const getLocalVersion = (): Version => {
  return toLocalVersion(getLocalVersionString());
};

export const isValidVersionString = (
  versionString: string | undefined
): boolean => {
  if (!versionString) {
    return false;
  }

  return /(?<major>[\d]*)\.(?<minor>[\d]*)\.(?<patch>[\d]*)/.test(
    versionString
  );
};

export const toLocalVersion = (versionString: string | undefined): Version => {
  if (isValidVersionString(versionString)) {
    const result = versionString?.match(
      /(?<major>[\d]*)\.(?<minor>[\d]*)\.(?<patch>[\d]*)(-)?(?<dev>.*)/
    )?.groups;

    if (result && result.major && result.minor && result.patch) {
      const { major, minor, patch, dev } = result;
      return {
        version: versionString!,
        major: +major,
        minor: +minor,
        patch: +patch,
        dev
      };
    }
  }
  throw new Error('Invalid version string');
};

export const getRemoteVersion = async (): Promise<Version> => {
  const response = await axiosClient.get('/version.json');
  return toLocalVersion(response.data.version);
};
