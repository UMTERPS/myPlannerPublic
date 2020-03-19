const packager = require('electron-packager');
const fse = require('fs-extra');
const rimraf = require('rimraf');
const path = require('path');
const CICDConstants = require('./constants/CICDConstants');

const config_darwin = {
  dir: CICDConstants.TEMPORARY_BUNDLE_BUILD_PATH,
  icon: './favicon.icns',
  overwrite: true,
  platform: ['darwin'],
  ignore: 'report.html'
};

const config_windows = {
  dir: CICDConstants.TEMPORARY_BUNDLE_BUILD_PATH,
  icon: './favicon.icns',
  overwrite: true,
  platform: 'win32',
  arch: 'x64',
  ignore: 'report.html'
};

const ELECTRON_SOURCE_ENTRY = path.join(
  CICDConstants.BACKEND_BUILD_PATH,
  'bundle.js'
);
const ELECTRON_TARGET_ENTRY = path.join(
  CICDConstants.TEMPORARY_BUNDLE_BUILD_PATH,
  'bundle.js'
);
const PACKAGE_JSON = path.join(
  CICDConstants.TEMPORARY_BUNDLE_BUILD_PATH,
  'package.json'
);

function postCleanUp() {
  rimraf.sync(CICDConstants.FRONTEND_BUILD_PATH);
  rimraf.sync(CICDConstants.BACKEND_BUILD_PATH);
  rimraf.sync(CICDConstants.TEMPORARY_BUNDLE_BUILD_PATH);
}

function combine() {
  if (
    fse.existsSync(CICDConstants.FRONTEND_BUILD_PATH) &&
    fse.existsSync(ELECTRON_SOURCE_ENTRY)
  ) {
    fse.emptyDirSync(CICDConstants.TEMPORARY_BUNDLE_BUILD_PATH);
    fse.copySync('./package_dist.json', PACKAGE_JSON);
    fse.copySync(
      CICDConstants.FRONTEND_BUILD_PATH,
      path.join(
        CICDConstants.TEMPORARY_BUNDLE_BUILD_PATH,
        CICDConstants.BUILD_ROOT
      )
    );
    fse.copySync(ELECTRON_SOURCE_ENTRY, ELECTRON_TARGET_ENTRY);
  }
}

async function bundleElectronApp(options) {
  console.log('starting bundling........');
  const appPaths = await packager(options);
  console.log(`Electron app bundles created:\n${appPaths.join('\n')}`);
}

combine();
bundleElectronApp(config_darwin);
postCleanUp();
