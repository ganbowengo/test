/*
 * @Descripttion: 
 * @Author: ganbowen
 * @Date: 2020-01-05 16:59:37
 * @LastEditors  : ganbowen
 * @LastEditTime : 2020-01-05 20:21:25
 */
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

function Promise1(executor) {
    let _this = this
    _this.status = PENDING
    _this.onResolveArr = []
    _this.onRejectArr = []
    _this.value = undefined; // fulfilled状态时 返回的信息
    _this.reason = undefined; // rejected状态时 拒绝的原因
    function resolve(value) {
        console.log('resolve1-----------------', value)
        if (value instanceof Promise1) return value.then(resolve, reject)
        setTimeout(() => {
            console.log('resolve2-----------------', value)
            if (_this.status === PENDING) {
                _this.status = FULFILLED
                _this.value = value
                _this.onResolveArr.forEach(cb => cb(_this.value))
            }
        }, 0)
    }

    function reject(reason) {
        console.log('reject1-----------------', reason)
        setTimeout(() => {
            console.log('reject2-----------------', reason)
            console.log('_this.onRejectArr', _this.onRejectArr)
            if (_this.status === PENDING) {
                _this.status = REJECTED
                _this.reason = reason
                _this.onRejectArr.forEach(cb => cb(_this.reason))
            }
        }, 0)
    }

    try {
        executor(resolve, reject)
    } catch (e) {
        reject(e)
    }
}

Promise1.all = function () {

}

Promise1.race = function () {

}

function resolvePromise(promise2, x, resolve, reject) {
    if (promise2 === x) return reject(new TypeError('循环引用'))
    let called = false; // 避免多次调用
    if (x instanceof Promise1) {
        if (x.status === PENDING) {
            try {
                x.then(y => {
                    resolvePromise(promise2, y, resolve, reject)
                }, reason => {
                    reject(reason)
                })
            } catch (e) {
                reject(e)
            }
        } else { // 同一个promise连续调用then
            x.then(resolve, reject)
        }
    } else if (x != null && (((typeof x === 'object') || (typeof x === 'function')))) {
        try {
            let then = x.then
            if (typeof then === 'function') {
                then.call(x, y => {
                    if (called) return;
                    called = true;
                    resolvePromise(promise2, y, resolve, reject);
                }, reason => {
                    if (called) return;
                    called = true;
                    reject(reason)
                })
            } else {
                resolve(x)
            }
        } catch (e) {
            if(called) return;
            called = true;
            reject(e)
        }
    } else {
        console.log('12313', x,resolve)
        resolve(x)
    }

}

Promise1.prototype.then = function (onResolve, onReject) {
    let _this = this
    let promise2
    onResolve = typeof onResolve === 'function' ? onResolve : value => value
    onReject = typeof onReject === 'function' ? onReject : reason => { throw reason }

    /*
        以下的setTimeout的使用是因为 then/catch 可以在同一个promise对象中连续使用
        要保证上一个then已经执行完成
    */
    if (_this.status === FULFILLED) {
        return promise2 = new Promise1((resolve, reject) => {
            setTimeout(() => {
                _this.onResolveArr.push(value => {
                    try {
                        let x = onResolve(value)
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                })
            })
        })
    }

    if (_this.status === REJECTED) {
        return promise2 = new Promise1((resolve, reject) => {
            setTimeout(() => {
                _this.onRejectArr.push(reason => {
                    try {
                        let x = onReject(reason)
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                })
            })
        })
    }

    if (_this.status === PENDING) {
        return promise2 = new Promise1((resolve, reject) => {
            _this.onResolveArr.push(value => {
                try {
                    let x = onResolve(value)
                    resolvePromise(promise2, x, resolve, reject)
                } catch (e) {
                    reject(e)
                }
            })
            _this.onRejectArr.push(reason => {
                try {
                    let x = onReject(reason)
                    resolvePromise(promise2, x, resolve, reject)
                } catch (e) {
                    reject(e)
                }
            })
        })
    }
}

Promise1.prototype.catch = function (onReject) {
    return this.then(null, onReject);
}

Promise1.resolve = function (value) {
    return new Promise1(resolve => {
        resolve(value)
    })
}

Promise1.reject = function (value) {
    return new Promise1((resolve, reject) => {
        reject(value)
    })
}


function executor(resolve, reject) {
    let value = Math.random() * 10
    // if (value > 5) {
        resolve(value)
    // } else {
    //     reject(value)
    // }
}
//将Promise改成我们自己的Bromsie
let demo = new Promise1(executor)

function onResolve(value) {
    console.log('onResolve+++++', value)
}

function onReject(value) {
    console.log('onReject++++++', value)
    // return new Promise1((resolve, reject) => {
    //     reject(100)
    // })
}

demo.then(onResolve).then(() => {
    console.log(11111)
})
// .then(e => {
//     console.log('erceng1111', e)
// }).catch(e => {
//     console.log('erceng', e)
// })