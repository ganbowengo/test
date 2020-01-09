/*
 * @Descripttion: 
 * @Author: ganbowen
 * @Date: 2020-01-09 10:13:46
 * @LastEditors  : ganbowen
 * @LastEditTime : 2020-01-09 10:35:15
 */

const { def } = require('../utils')
const arrayProto = Array.prototype
const arrayMethods = Object.create(arrayProto)

const methodsToPatch = [
    'push',
    'pop',
    'shift',
    'unshift',
    'splice',
    'sort',
    'reverse'
]

methodsToPatch.forEach(function (item) {
    const original = arrayProto[item]
    def(arrayMethods, item, function (...args) {
        let result = original.apply(this, args)
        let ob = this.__ob__
        let newArg
        switch (item) {
            case 'push':
            case 'unshift':
                newArg = args
                break
            case 'splice':
                newArg = args.slice(2)
                break
        }
        if (newArg) ob.observeArray(newArg)
        ob.dep.notify()
        return result
    })
})

module.exports = {
    arrayMethods
}
