/* eslint strict: 0 */
'use strict';

const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseConfig = require('./base');
const config = Object.assign({},baseConfig);
const path = require('path');

config.devtool = 'source-map';
config.entry = './src/app.js';
config.output.publicPath = '';
config.module.loaders.push({
  test: /^((?!\.module).)*\.css$/,
  loader: ExtractTextPlugin.extract(
    'style-loader',
    'css-loader'
  )
}, {
  test: /\.module\.css$/,
  loader: ExtractTextPlugin.extract(
    'style-loader',
    'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
  )
});

config.resolve.alias.config = path.join(__dirname,'../config/production.js');

config.plugins.push(
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.DefinePlugin({
    '__DEV__': false,
    'process.env': {
      'NODE_ENV': JSON.stringify('production')
    }
  }),
  new HtmlWebpackPlugin({
    filename: 'app.html',
    template: 'src/app.html'
  }),
  new webpack.optimize.UglifyJsPlugin({
    compressor: {
      screw_ie8: true,
      warnings: false
    }
  }),
  new ExtractTextPlugin('style.css', { allChunks: true })
);

config.target = 'electron';

module.exports = config;
