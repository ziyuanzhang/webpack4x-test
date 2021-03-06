const webpack = require('webpack');
const merge = require('webpack-merge');
const base = require('./webpack.base.js');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const glob = require('glob');
const purifyCssPlugin = require('purifycss-webpack');

module.exports = merge(base,{
    mode:'production',
    output: {
      filename: 'js/[name].[contenthash].js',
      //chunkFilename--解决cmd/amd加载js文件用的
      chunkFilename:'js/[name].[contenthash].js',
      publicPath:"/"
    } ,
    module:{
      rules:[
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
             MiniCssExtractPlugin.loader,
            'css-loader',
            'postcss-loader',
            'sass-loader',
          ],
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
      new MiniCssExtractPlugin({
        chunkFilename:'css/[name].[contenthash].css',
      }),
      //修改js，第三方依赖名字不变
      new webpack.HashedModuleIdsPlugin(),
      //删除未用的css
      new purifyCssPlugin({
        paths:glob.sync(path.join(__dirname,'src/*.html')),
    })
    ],
    optimization:{
      //公用的依赖提取出来
      runtimeChunk: 'single',
      //代码分离
      splitChunks:{
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all'
          }
        }
      }
      
    }
  });