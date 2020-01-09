/*
 * @Descripttion: 
 * @Author: ganbowen
 * @Date: 2020-01-07 16:15:14
 * @LastEditors  : ganbowen
 * @LastEditTime : 2020-01-09 11:32:14
 */

const { def, isObject } = require('../utils')
const { Dep } = require('./Dep')
const { arrayMethods } = require('./Array')

// 将数据处理为setter getter形式
function Observer(data) {
    def(data, '__ob__', this)
    this.dep = new Dep() // 数组
    if (Array.isArray(data)) {
        protoAugment(data, arrayMethods)
        this.observeArray(data)
    } else {
        this.observeObj(data)
    }
}

Observer.prototype.observeObj = function (obj) {
    let keys = Object.keys(obj)
    let i = keys.length
    while (i--) {
        defineReactive(obj, keys[i])
    }
}

Observer.prototype.observeArray = function (arr) {
    let i = arr.length
    while (i--) {
        observe(arr[i])
    }
}

function observe(obj) {
    if (!isObject(obj)) return
    let ob = null
    if (obj.__ob__ && obj.__ob__ instanceof Observer) {
        ob = obj.__ob__
    } else {
        ob = new Observer(obj)
    }
    return ob
}

function defineReactive(obj, key, val) {
    let dep = new Dep()
    const property = Object.getOwnPropertyDescriptor(obj, key)
    const getter = property && property.get
    const setter = property && property.set
    if ((!getter || setter) && arguments.length === 2) {
        val = obj[key]
    }
    let childOb = observe(val)
    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: function reactiveGetter() {
            const value = getter ? getter.call(obj) : val
            /* 将Dep.target（即当前的Watcher对象存入dep的subs中） */
            if (Dep.target) {
                dep.depend()
                if (childOb) {
                    childOb.dep.depend()
                    if (Array.isArray(value)) {
                        dependArray(value)
                    }
                }
            }
            return value;
        },
        set: function reactiveSetter(newVal) {
            console.log('123', 12313)
            const value = getter ? getter.call(obj) : val
            if (newVal === value || (newVal !== newVal && value !== value)) return;
            if (getter && !setter) return
            if (setter) {
                setter.call(obj, newVal)
            } else {
                val = newVal
            }
            childOb = observe(newVal)
            /* 在set的时候触发dep的notify来通知所有的Watcher对象更新视图 */
            dep.notify()
        }
    });
}


function protoAugment(target, arrayMethods) {
    if ('__proto__' in {}) {
        target.__proto__ = arrayMethods
    } else {
        const arrayKeys = Object.getOwnPropertyNames(arrayMethods)
        let i = arrayKeys.length
        while (i--) {
            let key = arrayKeys[i]
            def(target, key, arrayMethods[key])
        }
    }
}

function dependArray(value) {
    for (let e, i = 0, l = value.length; i < l; i++) {
        e = value[i]
        e && e.__ob__ && e.__ob__.dep.depend()
        if (Array.isArray(e)) {
            dependArray(e)
        }
    }
}


module.exports = {
    observe
}