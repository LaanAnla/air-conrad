const webpack = require('webpack');
const path = require('path')
const { merge } = require('webpack-merge')
const TerserPlugin = require("terser-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");

const config = require('./webpack.config');

module.exports = merge(config, {
  mode: 'production',
  output: {
    path: path.join(__dirname, 'public'),
    clean: true
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()]
  },
  plugins: [
    new CompressionPlugin(),
  ],
})