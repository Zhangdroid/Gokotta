/* eslint strict: 0 */
'use strict';

const path = require('path');

module.exports = {
  module: {
    loaders: [{
      test: /\.vue?$/,
      loader:'vue-loader',
      exclude: /node_modules/
    },{
      test: /\.js$/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015','stage-0']
      }
    },{
      test: /\.(jpe?g|png|gif|svg)$/i,
      loaders: [
        'file?hash=sha512&digest=hex&name=[hash].[ext]',
        'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
      ]
    }]
  },
  output: {
    path: path.join(__dirname, '../build'),
    filename: 'app.js',
    publicPath:'/'
  },
  resolve: {
    root: path.join(__dirname, '..'),
    extensions: ['', '.js', '.vue'],
    modulesDirectories: ['node_modules', 'src'],
    packageMains: ['webpack', 'browser', 'web', 'browserify', ['jam', 'main'], 'main'],
    alias: {}
  },
  plugins: [

  ],
  externals: [
  ]
};
