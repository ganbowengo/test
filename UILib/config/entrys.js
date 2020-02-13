/*
 * @Descripttion: 
 * @Author: ganbowen
 * @Date: 2020-02-12 16:51:33
 * @LastEditors  : ganbowen
 * @LastEditTime : 2020-02-13 14:19:03
 */
const path = require('path')

function resolve(url) {
    return path.resolve(__dirname, '..', url)
}

const entrys = {
    'button': resolve('libs/components/button/index.js')
}
module.exports = entrys