var webpack = require('webpack'),
  ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    home: ['js/common'],
    style: ['viewer.css']
  },
  output: {
    path: 'dist',
    filename: '[name].min.js'
  },
  resolve: {
    extensions: ['', '.js']
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('viewer.css')
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('[name].min.css', {
      allChunks: true
    })
  ]
};
