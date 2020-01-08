/*
 * @Descripttion: 
 * @Author: ganbowen
 * @Date: 2020-01-07 19:29:05
 * @LastEditors  : ganbowen
 * @LastEditTime : 2020-01-08 20:14:53
 */

const { Dep } = require('./Dep')
const bailRE = /[^\w.$]/

let uuid = 0
function Watcher(vm, expOrFn, cb) {
    this.vm = vm
    this.cb = cb
    this.id = ++uuid
    this.deps = []
    this.newDepIds = new Set()
    if (typeof expOrFn === 'function') {
        this.getter = expOrFn
    } else {
        this.getter = parsePath(expOrFn)
    }
    this.value = this.get()
}

Watcher.prototype.get = function () {
    Dep.target = this
    let value = this.getter.call(this.vm, this.vm)
    Dep.target = undefined
    return value
}

Watcher.prototype.addDep = function (dep) {
    let id = dep.id
    if (!this.newDepIds.has(id)) {
        this.newDepIds.add(id)
        this.deps.push(dep)
        dep.addSub(this)
    }
}

Watcher.prototype.update = function () {
    console.log('视图更新了')
    const oldValue = this.value
    this.value = this.get()
    this.cb.call(this.vm, this.value, oldValue)
}

Watcher.prototype.teardown = function () {
    let i = this.deps.length
    while (i--) {
        this.deps[i].removeSub(this)
    }
}

function parsePath(path) {
    if (bailRE.test(path)) return
    let segments = path.split('.')
    return function (obj) {
        for (let i = 0; i < segments.length; i++) {
            if (!obj) return
            obj = obj[segments[i]]
        }
        return obj
    }
}

module.exports = {
    Watcher
}