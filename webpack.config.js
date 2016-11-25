var webpack = require('webpack')
var autoprefixer = require('autoprefixer');
var path = require('path')

module.exports = {
  entry: process.env.NODE_ENV === 'development' ? [
    'webpack-dev-server/client?http://localhost:3001',
    'webpack/hot/only-dev-server',
    __dirname + '/public/src/main.js'
  ] : [
    __dirname + '/public/src/main.js'
  ],
  output: {
    path: __dirname + '/public',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader!postcss-loader',
        include: __dirname
      }
    ]
  },
  postcss: [ autoprefixer({ browsers: ['> 5%'] }) ],
  resolve: {
    extensions: ['', '.js', '.json']
  },
  plugins: process.env.NODE_ENV === 'development' ? [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ] : [
    new webpack.optimize.UglifyJsPlugin({ compressor: { warnings: false } })
  ]
}
