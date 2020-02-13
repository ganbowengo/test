/*
 * @Descripttion: 
 * @Author: ganbowen
 * @Date: 2020-02-12 15:58:25
 * @LastEditors  : ganbowen
 * @LastEditTime : 2020-02-13 18:21:30
 */
'use strict'
const path = require('path')
const entrys = require('./entrys')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader') // 处理.vue文件
const ProgressBarPlugin = require('progress-bar-webpack-plugin')

function resolve(url) {
    return path.resolve(__dirname, '..', url)
}

module.exports = {
    mode : 'production',
    entry: entrys,
    output: {
        path: resolve('dist'),
        filename: '[name].js',
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
            }
        ]
    },
    plugins: [
        new ProgressBarPlugin(),
        new CleanWebpackPlugin(),
        new VueLoaderPlugin()
    ]
}