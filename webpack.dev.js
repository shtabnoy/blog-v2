const merge = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    historyApiFallback: true,
    proxy: {
      '/images': {
        target: 'http://localhost:1337',
        pathRewrite: {
          '^/images': '/uploads',
        },
      },
    },
  },
})
