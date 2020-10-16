const fse = require('fs-extra');
const rimraf = require('rimraf');
const path = require('path');
const asar = require('asar');
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

combine();
asar
  .createPackage(
    path.join(__dirname, '../dist'),
    path.join(__dirname, '../output/app.asar')
  )
  .then(() => {
    postCleanUp();
    console.log(
      'asar has successfully packed the archive file to: /output/app.asar'
    );
  });
