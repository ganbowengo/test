/*
 * @Descripttion: throttle
 * @Author: ganbowen
 * @Date: 2020-01-06 17:26:42
 * @LastEditors  : ganbowen
 * @LastEditTime : 2020-01-06 20:52:25
 */

const { toArray } = require('../utils')

/**
 * 持续触发时 每隔 wait时间 执行一次
 * @param {Function} fn 需要节流的函数
 * @param {Number} wait 间隔时间
 * @param {Boolean} immediate 是否立即执行 true开始边界  false 结束边界
 */
function throttle(fn, wait, immediate = false) {
    let timer
    return function () {
        let args = toArray(arguments, 0)
        if (!timer) {
            immediate && fn.apply(this, args)
            tiemr = setTimeout(() => {
                !immediate && fn.apply(this, args)
                clearTimeout(timer)
                timer = null
            }, wait)
        }
    }
}


// 时间戳方式实现 开始边界节流
function throttle1(fn, wait) {
    let timer = 0
    return function () {
        let args = toArray(arguments, 0)
        let current = new Date().getTime()
        if (current - timer > wait) {
            fn.apply(this, args)
            timer = current
        }
    }
}

module.exports = {
    throttle
}