/*
 * @Descripttion: 
 * @Author: ganbowen
 * @Date: 2020-01-08 21:10:38
 * @LastEditors  : ganbowen
 * @LastEditTime : 2020-01-08 22:09:33
 */

const path = require('path')
module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'testVue.js',
        library: "TestVue",
        libraryTarget: 'this'
    }
}
