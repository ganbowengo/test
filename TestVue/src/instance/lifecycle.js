/*
 * @Descripttion: 
 * @Author: ganbowen
 * @Date: 2020-01-09 14:58:45
 * @LastEditors  : ganbowen
 * @LastEditTime : 2020-01-09 16:20:40
 */
const { pushTarget, popTarget } = require('../Observer/Dep')

function callHook(vm, hook) {
    pushTarget()
    const handlers = vm.$options[hook]
    if (handlers) {
        for (let i = 0, j = handlers.length; i < j; i++) {
            handlers[i].call(vm)
        }
    }
    popTarget()
}

module.exports = {
    callHook
}