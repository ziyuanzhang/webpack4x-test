const path = require('path');
const webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
var isProd = process.env.NODE_ENV === 'production'; 
var cssDev = ['style-loader', 'css-loader?sourceMap', 'sass-loader?sourceMap'];
var cssProd = ExtractTextPlugin.extract({
  fallback: 'style-loader',
  use: ['css-loader', 'sass-loader']
});
var cssConfig = isProd ? cssProd : cssDev;

let pathsToClean = [
  'dist',
]

module.exports = {
    mode:'development',
    devtool: 'source-map',
    entry:{
      "app":'./src/app.js',
      "contact": './src/contact.js'
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'js/[name].[hash].js'
    },
    devServer: {
      port: 9000,
      open: true,
      hot: true
    },
    module:{
      rules:[
        {
          test:/\.scss$/,
          use:cssConfig
        },
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
      new CleanWebpackPlugin(pathsToClean),
      new HtmlWebpackPlugin({
        title: 'My App',
        template: './src/index.html',
        filename: 'index.html',
        minify:{
          collapseWhitespace: true,
        },
        hash:true,
        excludeChunks: ['contact']
      }),
      new HtmlWebpackPlugin({
        template: './src/contact.html',
        filename: 'contact.html',
        minify: {
          collapseWhitespace: true,
        },
        hash: true,
        chunks: ['contact']
      }),
      new ExtractTextPlugin({
        filename:"css/[name].css",
        disable:!isProd
        
      }),
      /* 热加载用 */
      new webpack.NamedModulesPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      /* end----热加载用 --- */
      /* 以后要遇到或处理 jQuery 或 $ 都会去自动加载 jquery 这个库 */
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery'
      }),
      /* end----jQuery----$--- */
    ]
  };