/*
 * @Descripttion: 
 * @Author: ganbowen
 * @Date: 2020-01-08 15:51:44
 * @LastEditors  : ganbowen
 * @LastEditTime : 2020-01-09 10:47:31
 */
const { isPlainObject, noop } = require('../utils')
const { observe } = require('../Observer')
const { pushTarget, popTarget } = require('../Observer/Dep')

const sharedPropertyDefinition = {
    enumerable: true,
    configurable: true,
    get: noop,
    set: noop
}
function proxy(target, sourceKey, key) {
    sharedPropertyDefinition.get = function proxyGetter() {
        return this[sourceKey][key]
    }
    sharedPropertyDefinition.set = function proxySetter(val) {
        this[sourceKey][key] = val
    }
    Object.defineProperty(target, key, sharedPropertyDefinition)
}

function initState(vm) {
    const opt = vm.$options
    if (opt.data) {
        initData(vm)
    } else {
        observe(vm._data = {})
    }
    initWatch(vm, opt.watch)
}

function initData(vm) {
    let data = vm.$options.data
    data = vm._data = typeof data === 'function'
        ? getData(data, vm)
        : data || {}
    const keys = Object.keys(data)
    let i = keys.length
    while (i--) {
        proxy(vm, '_data', keys[i])
    }
    observe(data)
}

function getData(data, vm) {
    // 避免Dep添加依赖
    pushTarget()
    try {
        return data.call(vm, vm)
    } catch (e) {
        handleError(e, vm, `data()`)
        return {}
    } finally { // 利用finally 在return后 执行 finally中的语句
        popTarget()
    }
}

function initWatch(vm, watch) {
    for (let key in watch) {
        const handler = watch[key]
        createWatcher(vm, key, handler)
    }
}

function createWatcher(vm, expOrFn, handler, options) {
    if (isPlainObject(handler)) {
        options = handler
        handler = handler.handler
    }
    if (typeof handler === 'string') {
        handler = vm[handler]
    }
    vm.$watch(expOrFn, handler, options)
}

module.exports = {
    initState
}