/*
 * @Descripttion: 
 * @Author: ganbowen
 * @Date: 2020-01-08 21:01:51
 * @LastEditors  : ganbowen
 * @LastEditTime : 2020-01-09 10:45:12
 */
const { TestVue } = require('../dist/testVue')
new TestVue({
    // template render
    render: function () {
        console.log('this.data', this.info.name)
        console.log('this.class', this.class)
        setTimeout(() => {
            this.info.name = '小草'
            this.class.push('xiaocao')
        }, 1000)
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
        }
    }
})