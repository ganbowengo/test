/*
 * @Descripttion: 
 * @Author: ganbowen
 * @Date: 2020-01-07 16:15:14
 * @LastEditors  : ganbowen
 * @LastEditTime : 2020-01-08 19:47:45
 */

const { def } = require('../utils')
const { Dep } = require('./Dep')

// 将数据处理为setter getter形式
function Observer(data) {
    def(data, '__ob__', this)
    if (Array.isArray(data)) {

    } else {
        for (let key in data) {
            if (typeof data[key] === 'object') observer(data[key])
            else defineReactive(data, key)
        }
    }
}

function observer(obj) {
    if (obj.__ob__) {
        obj = obj.__ob__
    } else {
        new Observer(obj)
    }
}

function defineReactive(obj, key, val) {
    let dep = new Dep()
    const property = Object.getOwnPropertyDescriptor(obj, key)
    const getter = property && property.get
    const setter = property && property.set
    if ((!getter || setter) && arguments.length === 2) {
        val = obj[key]
    }
    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: function reactiveGetter() {
            /* 将Dep.target（即当前的Watcher对象存入dep的subs中） */
            dep.addSub(Dep.target);
            return val;
        },
        set: function reactiveSetter(newVal) {
            const value = getter ? getter.call(obj) : val
            if (newVal === value || (newVal !== newVal && value !== value)) return;
            if (getter && !setter) return
            if (setter) {
                setter.call(obj, newVal)
            } else {
                val = newVal
            }
            observer(obj)
            /* 在set的时候触发dep的notify来通知所有的Watcher对象更新视图 */
            dep.notify();
        }
    });
}

module.exports = {
    observer
}