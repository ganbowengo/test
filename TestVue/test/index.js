/*
 * @Descripttion: 
 * @Author: ganbowen
 * @Date: 2020-01-08 21:01:51
 * @LastEditors  : ganbowen
 * @LastEditTime : 2020-01-08 22:02:23
 */
const { TestVue } = require('../dist/testVue')
new TestVue({
    // template render
    render: function () {
        console.log('this.data', this.info.name)
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
            }
        }
    },
    watch: {
        'info.name': function (val) {
            console.log('val', val)
        }
    }
})