/*
 * @Descripttion: 
 * @Author: ganbowen
 * @Date: 2020-02-04 09:35:43
 * @LastEditors  : ganbowen
 * @LastEditTime : 2020-02-04 09:45:03
 */
const { resolve } = require('../allPublic/utils')
const port = 8000 // dev port
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
        }
    },
    // 自定义webpack配置
    configureWebpack: {
        resolve: {
            alias: {
                '@': resolve('src'),
            },
        }
    },
};
