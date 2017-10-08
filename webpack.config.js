var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './src/timodal.js',
  output: {
    filename: 'timodal.min.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: "window",
    library: "tiModal",
    umdNamedDefine: true
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false }
    })
  ]
};
