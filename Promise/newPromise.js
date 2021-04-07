/*
 * @Author       : ganbowen
 * @Date         : 2021-04-07 21:10:39
 * @LastEditors  : ganbowen
 * @LastEditTime : 2021-04-07 21:59:42
 * @Descripttion : promise node v12+
 */
// 1. 实现同步版本
// 2. 实现简易版异步版本
// 3. 实现多个then方法调用
// 4. 实现then方法链式是调用
// 5. 排除then链式调用返回值是promise实例本身
const PENDING = 'pending'
const FULFUILLED = 'fulfilled'
const REJECTED = 'rejected'

function resolvePromise (promise2, x, resolve, reject) {
    if(promise2 === x) {
        return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
    }
    if(x instanceof Promise1) {
        x.then(resolve, reject)
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
        executor(this.resolve, this.reject)
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
        const promise2 = new Promise1 ((resolve, reject) => {
            if (this.status === FULFUILLED) {
                queueMicrotask(() => {
                    let x = fulfillFn(this.value)
                    resolvePromise(promise2, x, resolve, reject)
                })
            } else if (this.status === REJECTED) {
                rejectedFn(this.reason)
            } else if (this.status === PENDING) {
                this.fulfillCallbacks.push(fulfillFn)
                this.rejectedCallbacks.push(rejectedFn)
            }
        })
        return promise2
    }

    catch = (rejectedFn) => {
        if (this.status === REJECTED) {
            rejectedFn(this.reason)
        }
    }
}

// 同步版本测试用例
new Promise1((resolve, reject) => {
    resolve('res')
    reject('err')
}).then(res => {
    console.log('res', res)
}, reason => {
    console.log('reason', reason)
})

// 异步版本测试用例
new Promise1((resolve, reject) => {
    setTimeout(() => {
        resolve('setTimeout - res')
    }, 1000)
}).then(res => {
    console.log('res', res)
}, reason => {
    console.log('reason', reason)
})

// 多then版本测试用例
const promise = new Promise1((resolve, reject) => {
    setTimeout(() => {
      resolve('success')
    }, 2000); 
})
  
promise.then(value => {
    console.log(1)
    console.log('resolve', value)
})

promise.then(value => {
    console.log(2)
    console.log('resolve', value)
})

promise.then(value => {
    console.log(3)
    console.log('resolve', value)
})    


// then链式调用测试用例
const promise1 = new Promise1((resolve, reject) => {
    // 目前这里只处理同步的问题
    resolve('then - Multiple')
})

function other () {
    return new Promise1((resolve, reject) =>{
        resolve('other')
    })
}

// then方法链式是调用测试用例
promise1.then(value => {
    console.log(1)
    console.log('resolve', value)
    return other()
}).then(value => {
    console.log(2)
    console.log('resolve', value)
})

// then方法中promise循环调用
const promise2 = new Promise((resolve, reject) => {
    resolve(100)
})
const p1 = promise2.then(value => {
    console.log(value)
    return p1
})