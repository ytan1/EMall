/*
* @Author: ytan1
* @Date:   2018-03-05 14:38:53
* @Last Modified by:   ytan1
* @Last Modified time: 2018-03-20 13:14:14
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
        'list' : ['./src/page/list/index.js'],
        'detail' : ['./src/page/detail/index.js'],
        'cart' : ['./src/page/cart/index.js'],
        'order-confirm' : ['./src/page/order-confirm/index.js'],
        'order-list' : ['./src/page/order-list/index.js'],
        'order-detail' : ['./src/page/order-detail/index.js'],
        'user-login' : ['./src/page/user-login/index.js'],
        'user-register' : ['./src/page/user-register/index.js'],
        'user-center' : ['./src/page/user-center/index.js'],
        'user-center-update' : ['./src/page/user-center-update/index.js'],
        'user-reset-password' : ['./src/page/user-reset-password/index.js'],
        'user-update-password' : ['./src/page/user-update-password/index.js'],
        'common': ['./src/page/common/index.js'],
        'result': ['./src/page/result/index.js'],
        'about': ['./src/page/about/index.js']

    },
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: 'http://source.ytan1mall.com/',   //base path for all css js file showed in dist html
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
                    name: 'common',   //same name as the js entry we want to set as a common module imported by every html
                    chunks: 'all',
                    minChunks: 2,     
                    enforce: true
                }
            }
        }
    },
    resolve: {
        alias: {
            node_modules: path.join(__dirname, '/node_modules'),
            util: path.join(__dirname, '/src/util'),
            view: path.join(__dirname, '/src/view'),
            image: path.join(__dirname, '/src/image'),
            service: path.join(__dirname, '/src/service'),
            page: path.join(__dirname, '/src/page')
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
                test: /\.string$/,
                use: 'html-loader'
            },
            {
                test: /\.(gif|png|jpe?g)(\?\S*)?$/,
                use: 'url-loader?limit=100&name=resourse/[name].[ext]'
            },
            //those are for loaders for font awesome 
            {
                test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                use: "url-loader?limit=10000&mimetype=application/font-woff"
            }, {
                test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
                use: "url-loader?limit=10000&mimetype=application/font-woff"
            }, {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                use: "url-loader?limit=10000&mimetype=application/octet-stream"
            }, {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                use: "file-loader"
            }, {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                use: "url-loader?limit=10000&mimetype=image/svg+xml"
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
        new HtmlWebpackPlugin( getHtmlConfig('list') ),
        new HtmlWebpackPlugin( getHtmlConfig('detail') ),
        new HtmlWebpackPlugin( getHtmlConfig('cart') ),
        new HtmlWebpackPlugin( getHtmlConfig('order-confirm') ),
        new HtmlWebpackPlugin( getHtmlConfig('order-list') ),
        new HtmlWebpackPlugin( getHtmlConfig('order-detail') ),
        new HtmlWebpackPlugin( getHtmlConfig('user-login') ),
        new HtmlWebpackPlugin( getHtmlConfig('user-register') ),
        new HtmlWebpackPlugin( getHtmlConfig('user-center') ),
        new HtmlWebpackPlugin( getHtmlConfig('user-center-update') ),
        new HtmlWebpackPlugin( getHtmlConfig('user-update-password') ),
        new HtmlWebpackPlugin( getHtmlConfig('user-reset-password') ),
        new HtmlWebpackPlugin( getHtmlConfig('result') ),
        new HtmlWebpackPlugin( getHtmlConfig('about') )
    ],
    devtool: 'cheap-module-source-map', 
    //-eval- best for find bug in source code on browser when developing,  use 'cheap-module-source-map' for production
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        inline: true,
        port: 8000,

        proxy: {
            '/api': {
                target: 'http://www.ytan1mall.com',
                changeOrigin: true
            }
        }
    }

}

module.exports = config
