/*
 * @Descripttion: 依赖收集
 * @Author: ganbowen
 * @Date: 2020-01-07 19:24:03
 * @LastEditors  : ganbowen
 * @LastEditTime : 2020-01-08 16:18:36
 */

const targetStack = []

let uuid = 0

function Dep() {
    this.id = ++uuid
    this.subs = []
}

Dep.target = null

Dep.prototype.addSub = function (sub) {
    this.subs.push(sub)
}

Dep.prototype.depend = function () {
    if (Dep.target) {
        Dep.target.addDep(this)
    }
}

Dep.prototype.removeSub = function (sub) {
    remove(this.subs, sub)
}

Dep.prototype.notify = function () {
    this.subs.forEach(item => item.update())
}


function remove(arr, sub) {
    if (arr.length) {
        let index = arr.indexOf(sub)
        if (item > -1) {
            arr.splice(index, 1)
        }
    }
}

function pushTarget(target) {
    targetStack.push(target)
    Dep.target = target
}

function popTarget() {
    targetStack.pop()
    Dep.target = targetStack[targetStack.length - 1]

}

module.exports = {
    Dep,
    pushTarget,
    popTarget
}