const builder = require('electron-builder');
const fse = require('fs-extra');
const rimraf = require('rimraf');
const path = require('path');
const CICDConstants = require('../constants/CICDConstants');

const ELECTRON_SOURCE_ENTRY = path.join(
  CICDConstants.BACKEND_BUILD_PATH,
  'app.js'
);
const ELECTRON_TARGET_ENTRY = path.join(
  CICDConstants.TEMPORARY_BUNDLE_BUILD_PATH,
  'app.js'
);
const PACKAGE_JSON = path.join(
  CICDConstants.TEMPORARY_BUNDLE_BUILD_PATH,
  'package.json'
);

function postCleanUp() {
  console.log('cleaning up temporary dir...');
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

function bundleElectronApp() {
  console.log('start bundling........');
  // Promise is returned
  if (!fse.existsSync(CICDConstants.TEMPORARY_BUNDLE_BUILD_PATH)) {
    throw new Error('working directory not exist!!!');
  }

  process.chdir(CICDConstants.TEMPORARY_BUNDLE_BUILD_PATH);

  builder
    .build({
      targets: builder.Platform.MAC.createTarget(),
      config: {
        appId: 'my.palnner',
        productName: 'MyPlanner',
        copyright: 'Copyright © 2020 Zewei',
        asar: true,
        electronVersion: '7.3.1',
        directories: {
          output: '../output'
        },
        files: ['build', '*'],
        icon: '../favicon.icns',
        electronDist: path.join(__dirname, '../node_modules/electron/dist'),
        dmg: {
          contents: [
            {
              x: 110,
              y: 150
            },
            {
              x: 240,
              y: 150,
              type: 'link',
              path: '/Applications'
            }
          ]
        }
      }
    })
    .then(results => {
      console.log(`Electron app successfully built at: ${results}`);
      process.chdir('..');
      postCleanUp();
    });
}

combine();
bundleElectronApp();
