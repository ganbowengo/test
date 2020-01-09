/*
 * @Descripttion: 
 * @Author: ganbowen
 * @Date: 2020-01-08 09:57:06
 * @LastEditors  : ganbowen
 * @LastEditTime : 2020-01-09 16:24:15
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
        console.log('this.class', this.class)
    },
    beforeCreate() {
        console.log('beforeCreate')
    },
    create() {
        console.log('create')
    },
    mounted() {
        console.log('this', this.class)
        setTimeout(() => {
            console.log('this.data', 12345678)
            this.class.push('xiaocao')
        }, 2000)
    },
    data: function () {
        return {
            name: '小明',
            info: {
                name: '小花',
                skill: {
                    play: 'basketball',
                    sin: 'The Girls'
                }
            },
            class: ['小明', '小张']
        }
    },
    watch: {
        'info.name': function (val) {
            console.log('val', val)
        },
        'class': function (val) {
            console.log('class', val)
        }
    }
})
module.exports = TestVue
