/*
* @Author: ytan1
* @Date:   2018-03-05 14:38:53
* @Last Modified by:   ytan1
* @Last Modified time: 2018-03-06 16:01:19
*/
const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const HtmlWebpackPlugin = require('html-webpack-plugin')

// const WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev'
//for webpack-html-plugin
const getHtmlConfig = (name) => ({
    template: './src/view/' + name + '.html',
    filename: 'view/' + name + '.html',
    title: name,
    inject: true,
    hash: true,
    chunks: ['common', name ] 
})
//webpack config
const config = {
    entry: {
        'index' : ['./src/page/index/index.js'],
        'login' : ['./src/page/login/index.js'],
        'common': ['./src/page/common/index.js']
    },
    output: {
        path: path.join(__dirname, 'dist'),
        // publicPath: '/dist/',
        filename: 'js/[name].js'
    },
    externals: {
        'jquery': 'window.jQuery'
    },
    optimization: {
        runtimeChunk: false,
        splitChunks: {
            cacheGroups: {
                commons: {
                    name: 'common',
                    chunks: 'all',
                    minChunks: 2,
                    enforce: true
                }
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                })
            },
            {
                test: /\.(gif|png|jpe?g|woff|svg|eot|ttf)(\?\S*)?$/,
                use: 'url-loader?limit=1000&name=resourse/[name].[ext]'
            }
        ]
    },
    plugins:[
        //common chunk removed in webpack4
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'common',
        //     filename: 'js/base.js'
        // }),

        //individual css loaded 
        new ExtractTextPlugin('css/[name].css'),
        //for html template
        new HtmlWebpackPlugin( getHtmlConfig('index') ),
        new HtmlWebpackPlugin( getHtmlConfig('login') )
    ],
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        contentBase: path.join(__dirname, 'dist')
    }

}

module.exports = config