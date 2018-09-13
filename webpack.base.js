const path = require('path');
const webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
/* "prod": "cross-env NODE_ENV=production webpack -p" */
module.exports = {
    entry:{
      "app":'./src/components/index/app.js',
      "contact": './src/components/contact/contact.js'
    }, 
    output: {
      path: path.resolve(__dirname, 'dist')
    } ,
    module:{
      rules:[
        {
          test:/\.(gif|png|jpe?g|svg)$/i,
          use:[{
              loader: 'url-loader',
              options:{
                limit: 10240,
                name:"[name].[ext]",
                outputPath: 'images/'
              }
            }]
        },
        /* {
          test: /\.svg$/,
          use: [{
              loader: 'file-loader',
              options:{
                name:"[name].[ext]",
                outputPath: 'images/'
              }
            }]
        }, */
        {
          test:/\.(woff|woff2|eot|ttf|otf)$/,
          use:[{
            loader: 'file-loader',
            options:{
              name:"[name].[ext]",
              outputPath: 'font/'
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
        },
        {
            test: /\.(ejs)$/,
            use: {
                loader: 'ejs-loader',
            }
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        title:'home',
        template: './src/components/index/index.ejs',
        filename: 'index.html',
        minify:{
          removeComments : true, 
          collapseWhitespace: true,
        },
        hash:process.env.NODE_ENV === 'production',
        excludeChunks: ['contact']
      }),
      new HtmlWebpackPlugin({
        title:'contact',
        template: './src/components/contact/contact.ejs',
        filename: 'contact.html',
        minify: {
          removeComments : true, //去掉注释
          collapseWhitespace: true,//去掉空格
        },
        hash: process.env.NODE_ENV === 'production',
        chunks: ['contact','vendors','runtime']
      }),
      /* 以后要遇到或处理 jQuery 或 $ 都会去自动加载 jquery 这个库 */
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery'
      }),
      /* end----jQuery----$--- */
    ]
  };