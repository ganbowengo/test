/*
 * @Author       : ganbowen
 * @Date         : 2021-04-07 21:10:39
 * @LastEditors  : ganbowen
 * @LastEditTime : 2021-04-07 21:38:47
 * @Descripttion : promise node v12+
 */
// 1. 实现同步版本
// 2. 实现简易版异步版本
// 3. 实现多个then方法调用
const PENDING = 'pending'
const FULFUILLED = 'fulfilled'
const REJECTED = 'rejected'

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
        if (this.status === FULFUILLED) {
            fulfillFn(this.value)
        } else if (this.status === REJECTED) {
            rejectedFn(this.reason)
        } else if (this.status === PENDING) {
            this.fulfillCallbacks.push(fulfillFn)
            this.rejectedCallbacks.push(rejectedFn)
        }
    }

    catch = (rejectedFn) => {
        if (this.status === REJECTED) {
            rejectedFn(this.reason)
        }
    }
}

new Promise1((resolve, reject) => {
    resolve('res')
    reject('err')
}).then(res => {
    console.log('res', res)
}, reason => {
    console.log('reason', reason)
})

new Promise1((resolve, reject) => {
    setTimeout(() => {
        resolve('setTimeout - res')
    }, 1000)
}).then(res => {
    console.log('res', res)
}, reason => {
    console.log('reason', reason)
})

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
  