
const webpack = require('webpack');
const base = require('./webpack.base.js');
const merge = require('webpack-merge');
module.exports = merge(base,{
    mode:'development',
    devtool: 'inline-source-map',
    output: {
      filename: 'js/[name].[hash].js'
    } ,
    devServer: {
      port: 9000,
      open: true,
      hot: true
    },
    module:{
      rules:[
        {
          test:/\.scss$/,
          use:['style-loader', 'css-loader?sourceMap', 'sass-loader?sourceMap']
        },
      ]
    },
    plugins: [
      /* 热加载用 */
      new webpack.NamedModulesPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      /* end----热加载用 --- */
    ]
  });