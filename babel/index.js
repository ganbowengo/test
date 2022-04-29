/*
 * @Author       : ganbowen
 * @Date         : 2022-01-09 20:38:50
 * @LastEditors  : ganbowen
 * @LastEditTime : 2022-01-09 20:44:16
 * @Descripttion : 
 */

const currency = require('currency.js')

function add () {
    console.log(123, currency(1.234, { precision: 5 }).format())
}

add()