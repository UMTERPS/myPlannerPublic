const webpack = require('webpack');
const path = require('path');
const webpackBundleAnalyzer = require('webpack-bundle-analyzer');
const CICDConstants = require('./constants/CICDConstants');

process.env.NODE_ENV = 'production';

module.exports = {
  mode: 'production',
  target: 'electron-main',
  entry: './app',
  output: {
    path: path.resolve(__dirname, CICDConstants.BACKEND_BUILD_PATH),
    publicPath: 'local://',
    filename: 'bundle.js'
  },
  plugins: [
    new webpackBundleAnalyzer.BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ]
};
