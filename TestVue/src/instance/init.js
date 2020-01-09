/*
 * @Descripttion: 
 * @Author: ganbowen
 * @Date: 2020-01-08 14:54:45
 * @LastEditors  : ganbowen
 * @LastEditTime : 2020-01-09 16:24:07
 */
const { initState } = require('./initState')
const { callHook } = require('./lifecycle')
const { mergeOptions } = require('../utils/options')
const { Watcher } = require('../Observer/Watcher')
const { noop } = require('../utils')

function initMixins(TestVue) {
    TestVue.prototype._init = function (options) {
        const vm = this
        vm.$options = mergeOptions(options)
        callHook(vm, 'beforeCreate')
        initState(vm)
        callHook(vm, 'created')
        new Watcher(vm, vm.$options.render, noop)
        callHook(vm, 'mounted')
    }
}

module.exports = {
    initMixins
}