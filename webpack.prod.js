const webpack = require('webpack');
const merge = require('webpack-merge');
const base = require('./webpack.base.js');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = merge(base,{
    mode:'production',
    output: {
      filename: 'js/[name].[chunkhash].js'
    } ,
    module:{
      rules:[
        {
          test:/\.scss$/,
          use:ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: ['css-loader', 'sass-loader']
          })
        }
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('production')
        }
      }),
      new CleanWebpackPlugin(["dist"]),
      new ExtractTextPlugin({
        filename:"css/[name].[chunkhash].css",
        disable:false        
      }),
    ]
  });