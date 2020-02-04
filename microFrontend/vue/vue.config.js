/*
 * @Descripttion: 
 * @Author: ganbowen
 * @Date: 2020-02-04 09:35:43
 * @LastEditors  : ganbowen
 * @LastEditTime : 2020-02-04 09:44:21
 */
const { resolve } = require('../allPublic/utils')
const { name } = require('./package')
const port = 8001 // dev port
module.exports = {
    outputDir: 'dist',
    assetsDir: 'static',
    filenameHashing: true,
    devServer: {
        hot: true,
        disableHostCheck: true,
        port,
        overlay: {
            warnings: false,
            errors: true,
        },
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
    },
    // 自定义webpack配置
    configureWebpack: {
        resolve: {
            alias: {
                '@': resolve('src'),
            },
        },
        output: {
            // 把子应用打包成 umd 库格式
            library: `${name}-[name]`,
            libraryTarget: 'umd',
            jsonpFunction: `webpackJsonp_${name}`,
        },
    },
};
