/*
 * @Descripttion: 
 * @Author: ganbowen
 * @Date: 2020-01-08 09:57:06
 * @LastEditors  : ganbowen
 * @LastEditTime : 2020-01-08 20:01:29
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

new TestVue({
    // template render
    render: function () {
        console.log('this.data', this.info.name)
    },
    data: function () {
        return {
            name: '小明',
            info: {
                name: '小花'
            }
        }
    },
    watch: {
        'info.name': function (val) {
            console.log('val', val)
        }
    }
})