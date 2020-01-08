/*
 * @Descripttion: 
 * @Author: ganbowen
 * @Date: 2020-01-08 14:54:45
 * @LastEditors  : ganbowen
 * @LastEditTime : 2020-01-08 17:52:36
 */
const { initState } = require('./initState')
const { Watcher } = require('../Observer/Watcher')
const { noop } = require('../utils')

function initMixins(TestVue) {
    TestVue.prototype._init = function (options) {
        const vm = this
        vm.$options = options
        initState(vm)
        new Watcher(vm, vm.$options.render, noop)
        setTimeout(() => {
            this.info.name = '小草'
        }, 1000)
    }
}

module.exports = {
    initMixins
}