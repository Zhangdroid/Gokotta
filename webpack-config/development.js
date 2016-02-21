/* eslint strict: 0 */
'use strict';

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseConfig = require('./base');
const path = require('path');

const config = Object.create(baseConfig);

config.debug = true;

config.devtool = 'cheap-module-eval-source-map';

config.entry = [
  'webpack-hot-middleware/client?noInfo=true&reload=true',
  './src/app.js'
];

config.output.publicPath = 'http://localhost:3000/build/';

config.module.loaders.push({
  test: /^((?!\.module).)*\.css$/,
  loaders: [
    'style-loader',
    'css-loader'
  ]
}, {
  test: /\.module\.css$/,
  loaders: [
    'style-loader',
    'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!'
  ]
});

config.resolve.alias.config = path.join(__dirname , '../config/development.js');

config.plugins.push(
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin(),
  new webpack.DefinePlugin({
    '__DEV__': true,
    'process.env': {
      'NODE_ENV': JSON.stringify('development')
    }
  }),
  new HtmlWebpackPlugin({
    filename: 'app.html',
    template: 'src/app.html'
  })
);

config.target = 'electron';

module.exports = config;
