/*
 * @Descripttion: 
 * @Author: ganbowen
 * @Date: 2020-01-08 09:57:06
 * @LastEditors  : ganbowen
 * @LastEditTime : 2020-01-08 21:20:43
 */

const { Watcher } = require('./Observer/Watcher')
const { initMixins } = require('./instance/init')

function TestVue(options) {
    this._init(options)
}

initMixins(TestVue)

TestVue.prototype.$watch = function (expOrFn, cb, options) {
    const vm = this
    const watcher = new Watcher(vm, expOrFn, cb, options)
    return function unwatchFn() {
        watcher.teardown()
    }
}

module.exports = TestVue
