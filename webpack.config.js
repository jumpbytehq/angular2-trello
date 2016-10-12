/*jshint esversion: 6*/
'use strict';
let path = require('path');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let webpack = require('webpack');


module.exports = {
  context: path.join(process.cwd(), 'client'),


  resolve: {
    root: [ path.join(process.cwd(), 'client') ],
    extensions: ['', '.ts', '.js', '.json']
  },

  entry: {
    main: './app/main.js',
    style: './style.js',
  },

  output: {
    path: './client/app/dist',
    filename: '[name].bundle.js'
  },

  plugins: [
    new ExtractTextPlugin('style.bundle.css')
  ],

  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /(node_modules)/,
        query: {
          presets: ['latest', 'angular2']
        }
      },
      { 
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
      }
    ]
  },

  stats: {
    errorDetails: true,
    colors: true,
    modules: true,
    reasons: true
  },

  node: {
    global: 'window',
    crypto: 'empty',
    process: true,
    module: false,
    clearImmediate: false,
    setImmediate: false
  },

  devtool: 'source-map'
};
