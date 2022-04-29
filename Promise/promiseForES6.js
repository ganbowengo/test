/*
 * @Descripttion: 
 * @Author: ganbowen
 * @Date: 2020-08-04 10:24:44
 * @LastEditors  : ganbowen
 * @LastEditTime : 2021-09-10 10:24:52
 */

const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class Promise2 {
    constructor(method) {
        this.status = PENDING
        this.value = undefined  // fulfilled 的返回值
        this.reason = undefined // rejected 的返回值
        this.successCbs = [] // 成功回调函数
        this.errorCbs = [] // 失败回调函数
        try {
            method(this.resolve.bind(this), this.reject.bind(this))
        } catch (e) {
            this.reject(e)
        }
    }

    resolve (value) {
        if (value instanceof Promise2) return value.then(this.resolve, this.reject)
        setTimeout(() => {
            if (this.status === PENDING) {
                this.status = FULFILLED
                this.value = value
                this.successCbs.forEach(cb => cb(this.value))
            }
        })
    }

    reject (reason) {
        setTimeout(() => {
            if (this.status === PENDING) {
                this.status = REJECTED
                this.reason = reason
                this.errorCbs.forEach(cb => cb(this.reason))
            }
        })
    }

    then (successCb, errorCb) {
        let onResolve = typeof successCb === 'function' ? successCb : value => value
        let onReject = typeof errorCb === 'function' ? errorCb : value => value
        let promise = new Promise2((resolve, reject) => {
            if (this.status === FULFILLED) {
                setTimeout(_ => {
                    try {
                        let x = onResolve(this.value)
                        resolvePromise(promise, x, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                })
            }

            if (this.status === REJECTED) {
                setTimeout(_ => {
                    try {
                        let x = onReject(this.reason)
                        resolvePromise(promise, x, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                })
            }

            if (this.status === PENDING) {
                this.successCbs.push(value => {
                    try {
                        let x = onResolve(value)
                        resolvePromise(promise, x, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                })
                this.errorCbs.push(reason => {
                    try {
                        let x = onReject(reason)
                        resolvePromise(promise, x, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                })
            }
        })
        return promise
    }

    catch (onReject) {
        return this.then(null, onReject)
    }

    static resolve (value) {
        return new Promise2((resolve, reject) => {
            resolve(value)
        })
    }

    static reject (value) {
        return new Promise2((resolve, reject) => {
            reject(value)
        })
    }

    static all (promises) {
        let count = 0
        let obj = []
        return new Promise2((resolve, reject) => {
            promises.forEach((promise, index) => {
                promise.then(val => {
                    count++
                    obj[index] = val
                    if (promises.length === count) {
                        resolve(obj)
                    }
                })
            })
        })
    }

    static race (promises) {
        return new Promise2((resolve, reject) => {
            promises.forEach(promise => {
                promise.then(resolve, reject)
            })
        })
    }
}

function resolvePromise (promise, x, resolve, reject) {
    if (promise === x) return reject(new Error('循环调用！'))
    let called = false // 避免x为object 和 函数的时候循环调用
    if (x instanceof Promise2) {
        if (x.status === PENDING) {
            try {
                x.then(y => {
                    resolvePromise(promise, y, resolve, reject)
                }, reason => {
                    reject(reason)
                })
            } catch (e) {
                reject(e)
            }
        } else {
            x.then(resolve, reject)
        }
    } else if (x !== null && (typeof x === 'function' || typeof x === 'object')) {
        try {
            let then = x.then
            if (typeof then === 'function') {
                then.call(x, y => {
                    if (called) return
                    called = true
                    resolvePromise(promise, y, resolve, reject)
                }, reason => {
                    if (called) return
                    called = true
                    reject(reason)
                })
            } else {
                resolve(x)
            }
        } catch (e) {
            if (called) return
            called = true
            reject(e)
        }
    } else {
        resolve(x)
    }
}

// let a = new Promise2((resolve, reject) => {
//     resolve('我是第一个')
// }).then(v => {
//     console.log('v------', v)
//     return 1111
// }).then(v => {
//     console.log('a', a)
//     console.log('v++++++', v)
// })

Promise2.all([new Promise2((resolve, reject) => {
    resolve('我是第一个')
}), new Promise2((resolve, reject) => {
    resolve('我是第二个')
})]).then(val => {
    console.log('val', val)
})
// 执行过程
// 1. resolve('我是第一个') 进入队列 setTimeout等待 通过then设置回调函数 并返回 Promise实例A
// 2. 执行then设置的回调函数 输出 console.log('v------', v)
// 3. 回调函数返回 1111 将 1111 作为x 传入 resolvePromise中 
// 4. Promise实例A 的 resolve(1111) 进入队列 setTimeout等待
// 5. 通过then设置回调函数 并返回 Promise实例B
// 6. 执行then设置的回调函数 输出 console.log('v++++++', v)