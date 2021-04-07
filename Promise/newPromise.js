/*
 * @Author       : ganbowen
 * @Date         : 2021-04-07 21:10:39
 * @LastEditors  : ganbowen
 * @LastEditTime : 2021-04-07 21:32:13
 * @Descripttion : promise node v12+
 */
const PENDING = 'pending'
const FULFUILLED = 'fulfilled'
const REJECTED = 'rejected'

class Promise1 {
    status = PENDING
    value = null
    reason = null
    fulfillCallback = null
    rejectedCallback = null
    constructor (executor) {
        executor(this.resolve, this.reject)
    }

    resolve = (value) => {
        if (this.status === PENDING) {
            this.status = FULFUILLED
            this.value = value
            this.fulfillCallback && this.fulfillCallback(value)
        }
    }

    reject = (reason) => {
        if (this.status === PENDING) {
            this.status = REJECTED
            this.reason = reason
            this.rejectedCallback && this.rejectedCallback(reason)
        }
    }

    then = (fulfillFn, rejectedFn) => {
        if (this.status === FULFUILLED) {
            fulfillFn(this.value)
        } else if (this.status === REJECTED) {
            rejectedFn(this.reason)
        } else if (this.status === PENDING) {
            this.fulfillCallback = fulfillFn
            this.rejectedCallback = rejectedFn
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