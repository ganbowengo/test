/*
 * @Descripttion: debounce
 * @Author: ganbowen
 * @Date: 2020-01-06 17:25:13
 * @LastEditors  : ganbowen
 * @LastEditTime : 2020-01-06 20:53:11
 */

const { toArray } = require('../utils')

// 开始边界
// 结束边界
/**
 * 
 * @param {Function} fn 需要防抖的函数
 * @param {*} wait 等待时间
 * @param {*} immediate 是否立即执行 true 开始边界 false 结束边界
 */
function debounce(fn, wait, immediate = false) {
    let timer
    return function () {
        let args = toArray(arguments, 0)
        clearTimeout(timer)
        if (immediate) {
            // 第一次触发时 立即执行
            // 之后每次触发都更新等待时间
            let now = !timer
            tiemr = setTimeout(() => {
                timer = null
            }, wait)
            if (now) {
                fn.apply(this, args)
            }
        } else {
            timer = setTimeout(() => {
                fn.apply(this, args)
            }, wait)
        }
    }
}

module.exports = {
    debounce
}