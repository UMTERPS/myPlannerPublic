const webpack = require('webpack');
const path = require('path');
const CICDConstants = require('./constants/CICDConstants');

process.env.NODE_ENV = 'development';

module.exports = {
  mode: 'development',
  target: 'electron-main',
  entry: './application.ts',
  output: {
    path: path.resolve(__dirname),
    filename: CICDConstants.BACKEND_APP_ENTRY
  },
  module: {
    rules: [
      {
        test: /\.(ts)$/,
        use: {
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
            compilerOptions: {
              declarationMap: false
            }
          }
        }
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ]
};
