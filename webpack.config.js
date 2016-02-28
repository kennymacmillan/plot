var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './client',
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.js'
  },
  resolve: {
    modulesDirectories: ['shared', 'node_modules'],
    extensions: ['', '.js', '.jsx']
  },
  module: {
    preLoaders: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        loaders: ['eslint-loader']
      }
    ],
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['babel-loader']
      }
    ]
  },
  plugins: [
    new webpack.NoErrorsPlugin()
  ]
};