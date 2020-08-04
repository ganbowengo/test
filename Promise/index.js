/*
 * @Descripttion: 
 * @Author: ganbowen
 * @Date: 2020-01-05 16:59:37
 * @LastEditors: ganbowen
 * @LastEditTime: 2020-08-04 18:45:51
 */
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'


function Promise1 (executor) {
    let _this = this
    _this.status = PENDING
    _this.onResolveArr = []
    _this.onRejectArr = []
    _this.value = undefined; // fulfilled状态时 返回的信息
    _this.reason = undefined; // rejected状态时 拒绝的原因
    function resolve (value) {
        if (value instanceof Promise1) return value.then(resolve, reject)
        setTimeout(() => {
            if (_this.status === PENDING) {
                _this.status = FULFILLED
                _this.value = value
                _this.onResolveArr.forEach(cb => cb(_this.value))
            }
        }, 0)
    }

    function reject (reason) {
        setTimeout(() => {
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

function resolvePromise (promise2, x, resolve, reject) {
    if (promise2 === x) return reject(new TypeError('循环引用'))
    /**
     *  // 循环引用
        let promise = new Promise1((resolve,reject) => {
            resolve(true)
        }).then(value => {
            return promise
        })
     */
    let called = false; // 避免多次调用
    if (x instanceof Promise1) {
        /**
         *  // 返回Promise1 x
            let promise = new Promise1((resolve,reject) => {
                resolve(true)
            }).then(value => {
                return new Promise1((resolve,reject) => {
                    resolve(true)
                })
            })
        */
        if (x.status === PENDING) {
            try {
                console.log('123__________-----------', 111)
                x.then(y => {
                    console.log('111===========', 1111)
                    resolvePromise(promise2, y, resolve, reject)
                }, reason => {
                    reject(reason)
                })
            } catch (e) {
                reject(e)
            }
        } else { // 同一个promise连续调用then
            /**
             *  // 已经触发的Promise
             */
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
            if (called) return;
            called = true;
            reject(e)
        }
    } else {
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
    console.log('_this.status', _this.status)
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

// 偏函数+哨兵变量 实现异步协同
function gen (len, resolve) {
    let count = 0
    let values = []
    return function (i, value) {
        values[i] = value
        if (++count === len) {
            resolve(values)
        }
    }
}

Promise1.all = function (promises) {
    return new Promise1((resolve, reject) => {
        let done = gen(promises.length, resolve)
        promises.forEach((promise, index) => {
            promise.then(value => {
                done(value, index)
            }, reject)
        })
    })
}

Promise1.race = function (promises) {
    return new Promise1((resolve, reject) => {
        promises.forEach((promise) => {
            promise.then(resolve, reject)
        })
    })
}

Promise1.resolve = function (value) {
    return new Promise1(resolve => {
        console.log('1211_+++++++++++++++++')
        resolve(value)
    })
}

Promise1.reject = function (value) {
    return new Promise1((resolve, reject) => {
        reject(value)
    })
}


// let demo = new Promise1((resolve, reject) => {
// let value = Math.random() * 10
// if (value > 5) {
// resolve(value)
// } else {
//     reject(value)
// }
// })

function onResolve (value) {
    console.log('onResolve+++++', value)
    return new Promise1((resolve, reject) => {
        resolve(123)
    }).then(val => {
        console.log(val)
    })
}

function onReject (value) {
    console.log('onReject++++++', value)
    // return new Promise1((resolve, reject) => {
    //     reject(100)
    // })
}

// demo.then(onResolve).catch(() => {
//     console.log(11111)
// })
// .then(e => {
//     console.log('erceng1111', e)
// }).catch(e => {
//     console.log('erceng', e)
// })

// let promise = new Promise1((resolve, reject) => {
//     resolve(true)
// }).then(value => {
//     console.log('123', 1)
//     new Promise1((resolve, reject) => {
//         console.log('内部promise')
//         resolve()
//     }).then(() => {
//         console.log('内部第一个then')
//         return Promise1.resolve()
//     }).then((v) => {
//         console.log('内部第二个then', v)
//     }).then((v) => {
//         console.log('内部第san个then', v)
//     }).then((v) => {
//         console.log('内部第si个then', v)
//     })
// }).then(value => {
//     console.log('123', 2, value)
//     // return promise.then(val => {
//     //     console.log('1233213')
//     // })
// }).then(value => {
//     console.log('123', 3, value)
//     // return promise.then(val => {
//     //     console.log('1233213')
//     // })
// }).then(value => {
//     console.log('123', 4, value)
// }).then(val => {
//     console.log('val', 5, val)
// })

let a = new Promise1((resolve, reject) => {
    resolve(123)
}).then(v => {
    console.log('v', v)
    return a
}).then(v => {
    console.log('v', v)
})

/**
 *
 * promise的then中方法先保存到一个回调函数队列中
 * 当promise对象实例化时，触发内部 resolve 或者 reject 方法
 * 在resolve中执行回调函数队列中的then中的回调函数
 * 每resolve一次 就需要将当前回调向settimeout队列之后移动一步
 *
 * */
