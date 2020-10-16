const path = require('path');
const { styles } = require('@ckeditor/ckeditor5-dev-utils');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BUILD_PATH = 'build';

process.env.NODE_ENV = 'development';

module.exports = {
  mode: 'development',
  target: 'electron-renderer',
  devtool: 'cheap-module-source-map',
  entry: './src/index.tsx',
  watch: true,
  output: {
    path: path.join(__dirname, BUILD_PATH),
    filename: 'index.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      favicon: './favicon.ico'
    })
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  optimization: {
    usedExports: true
  },
  module: {
    rules: [
      {
        test: /\.svg$/,
        use: ['raw-loader']
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader']
      },
      {
        test: /\.(ts|tsx)$/,
        use: {
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
            compilerOptions: {
              declarationMap: false
            }
          }
        }
      },
      {
        test: /(\.css)$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'postcss-loader',
            options: styles.getPostCssConfig({
              minify: false
            })
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader' // creates style nodes from JS strings
          },
          {
            loader: 'css-loader' // translates CSS into CommonJS
          },
          {
            loader: 'less-loader', // compiles Less to CSS
            options: {
              javascriptEnabled: true
            }
          }
        ]
      }
    ]
  }
};
