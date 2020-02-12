/*
 * @Descripttion: 
 * @Author: ganbowen
 * @Date: 2020-02-12 15:58:25
 * @LastEditors  : ganbowen
 * @LastEditTime : 2020-02-12 17:28:05
 */
'use strict'
const entrys = require('./entrys')
const { VueLoaderPlugin } = require('vue-loader') // 处理.vue文件
const ProgressBarPlugin = require('progress-bar-webpack-plugin')

function resolve(url) {
    return path.resolve(__dirname, '..', url)
}

module.exports = {
    entry: entrys,
    output: {
        path: resolve('dist'),
        filename: '[name]/index.js',
        library: 'G-UI',
        libraryTarget: 'commonjs2',
    },
    // 文件映射
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        modules: ['node_modules'],
        alias: {}
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [resolve('libs')],
                exclude: [/node_modules/]
            },
            {
                test: /\.vue$/,
                include: [resolve('libs')],
                loader: 'vue-loader'
            },
            {
                test: /\.scss$/,
                exclude: [/node_modules/],
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.css$/,
                loaders: ['style-loader', 'css-loader']
            },
            {
                test: /\.(woff|svg|eot|ttf)\??.*$/,
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
        new ProgressBarPlugin(),
        new VueLoaderPlugin()
    ]
}