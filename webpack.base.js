const path = require('path');
const webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
/* "prod": "cross-env NODE_ENV=production webpack -p" */
module.exports = {
    entry:{
      "app":'./src/app.js',
      "contact": './src/contact.js'
    }, 
    output: {
      path: path.resolve(__dirname, 'dist')
    } ,
    module:{
      rules:[
        {
          test:/\.(gif|png|jpe?g|svg)$/i,
          use:[{
              loader: 'file-loader',
              options:{
                name:"[name].[ext]",
                outputPath: 'images/'
              }
            }]
        },
        {
          loader: 'image-webpack-loader',
          options: {
            bypassOnDebug: true,
          }
        },
        {
          test: /\.html$/,
          use: [{
            loader: 'html-loader',
            options: {
              minimize: true
            }
          }],
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'My App',
        template: './src/index.html',
        filename: 'index.html',
        minify:{
          collapseWhitespace: true,
        },
        hash:process.env.NODE_ENV === 'production',
        excludeChunks: ['contact']
      }),
      new HtmlWebpackPlugin({
        template: './src/contact.html',
        filename: 'contact.html',
        minify: {
          collapseWhitespace: true,
        },
        hash: process.env.NODE_ENV === 'production',
        chunks: ['contact']
      }),
      /* 以后要遇到或处理 jQuery 或 $ 都会去自动加载 jquery 这个库 */
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery'
      }),
      /* end----jQuery----$--- */
    ]
  };