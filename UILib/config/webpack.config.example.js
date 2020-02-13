/*
 * @Descripttion: 
 * @Author: ganbowen
 * @Date: 2020-02-13 14:31:41
 * @LastEditors  : ganbowen
 * @LastEditTime : 2020-02-13 14:46:29
 */
/**
 *
 * author ganbowen
 * description 开发环境
 * created 2019/05/03 14:27:18
 *
 */
'use strict'
const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin') 
function resolve(url) {
    return path.resolve(__dirname, '..', url)
}

module.exports = {
    mode: 'development',
    entry: resolve('examples/src/main.js'),
    output: {
        path: resolve('examples/dist'),
        filename: 'static/js/[name]-[hash:8].js',
        chunkFilename: 'static/js/[name]-[hash:8].js'
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        modules: ['node_modules'],
        alias: {}
    },
    // 运行的配置
    devtool: 'cheap-module-eval-source-map', // 可以在开发环境看到源文件
    devServer: {
        open: true,
        compress: true,
        clientLogLevel: 'warning',
        port: 8009,
        inline: true,
        hot: true,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [resolve('examples/src')],
                exclude: [/node_modules/]
            },
            {
                test: /\.vue$/,
                include: [resolve('examples/src')],
                loader: 'vue-loader'
            }, {
                test: /\.scss$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.css$/,
                loaders: ['style-loader', 'css-loader']
            },
            {
                test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        name: '[name]-[hash:5].min.[ext]',
                        limit: 5000,
                        outputPath: 'static/css/fonts'
                    }
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: resolve('examples/public/index.html'),
            filename: `index.html`
        }),
        new VueLoaderPlugin()
    ]
}
