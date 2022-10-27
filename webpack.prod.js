const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { merge } = require('webpack-merge');

const common = require('./webpack.config.js');

module.exports = merge(common, {
  mode: 'production',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist'),
    libraryTarget: 'umd',
    libraryExport: 'default',
  },
  plugins: [new CleanWebpackPlugin()],
});
