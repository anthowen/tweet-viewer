var webpack = require('webpack');

module.exports = {
  entry: __dirname + '/app.jsx',
  output: {
    path: __dirname + '/assets/',
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        loader: 'babel',
      }
    ]
  },
  devtool: 'inline-source-map'
};