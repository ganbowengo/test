/*
 * @Author       : ganbowen
 * @Date         : 2021-04-07 21:10:39
 * @LastEditors  : ganbowen
 * @LastEditTime : 2021-04-07 22:45:05
 * @Descripttion : promise node v12+
 */
// 1. 实现同步版本
// 2. 实现简易版异步版本
// 3. 实现多个then方法调用
// 4. 实现then方法链式是调用
// 5. 排除then链式调用返回值是promise实例本身
// 6. 实现错误捕获及then的链式调用其他状态代码补充
// 7. 实现catch方法，then中方法的异常捕获处理，then中回调函数可选
const PENDING = 'pending'
const FULFUILLED = 'fulfilled'
const REJECTED = 'rejected'

function resolvePromise (promise2, x, resolve, reject) {
    if(promise2 === x) {
        return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
    }
    if (typeof x === 'object' || typeof x === 'function') {
        if (x === null) {
            return resolve(x)
        }
        let then
        try {
            then = x.then
        } catch (e) {
            return reject(e)
        }
        
        if (typeof then === 'function') {
            let called = false
            try {
                then.call(x, y => {
                    if (called) return
                    called = true
                    resolvePromise(promise2, y, resolve, reject)
                }, r => {
                    if (called) return
                    called = true
                    reject(r)
                })
            } catch (e) {
                if (called) return;
                reject(e)
            }
        } else {
            resolve(x)
        }
    } else {
        resolve(x)
    }
}

class Promise1 {
    status = PENDING
    value = null
    reason = null
    fulfillCallbacks = []
    rejectedCallbacks = []

    constructor (executor) {
        try {
            executor(this.resolve, this.reject)
        } catch (e) {
            this.reject(e)
        }
    }

    resolve = (value) => {
        if (this.status === PENDING) {
            this.status = FULFUILLED
            this.value = value
            while(this.fulfillCallbacks.length) {
                this.fulfillCallbacks.shift()(value)
            }
        }
    }

    reject = (reason) => {
        if (this.status === PENDING) {
            this.status = REJECTED
            this.reason = reason
            while(this.rejectedCallbacks.length) {
                this.rejectedCallbacks.shift()(reason)
            }
        }
    }

    then = (fulfillFn, rejectedFn) => {
        fulfillFn = typeof fulfillFn === 'function' ? fulfillFn : value => value
        rejectedFn = typeof rejectedFn === 'function' ? rejectedFn : reason => { throw reason }
        const promise2 = new Promise1 ((resolve, reject) => {
            const fulfilledMicrotask = () => {
                queueMicrotask(() => {
                    try {
                        let x = fulfillFn(this.value)
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                })
            }
            const rejectedMicrotask = () => {
                queueMicrotask(() => {
                    try {
                        let x = rejectedFn(this.reason)
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                })
            }
            if (this.status === FULFUILLED) {
                fulfilledMicrotask()
            } else if (this.status === REJECTED) {
                rejectedMicrotask()
            } else if (this.status === PENDING) {
                this.fulfillCallbacks.push(fulfilledMicrotask)
                this.rejectedCallbacks.push(rejectedMicrotask)
            }
        })
        return promise2
    }

    catch = (rejectedFn) => {
        return this.then(null, rejectedFn)
    }
}


Promise1.deferred = function () {
    var result = {}
    result.promise = new Promise1(function (resolve, reject) {
      result.resolve = resolve
      result.reject = reject
    })
  
    return result
}
module.exports = Promise1