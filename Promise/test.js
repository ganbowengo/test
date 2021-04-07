/*
 * @Author       : ganbowen
 * @Date         : 2021-04-07 22:19:06
 * @LastEditors  : ganbowen
 * @LastEditTime : 2021-04-07 22:19:59
 * @Descripttion : 
 */

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

const promise3 = new Promise1((resolve, reject) => {
    // resolve('success')
    throw new Error('执行器错误')
 })
 
// 实现错误捕获及then的链式调用其他状态代码补充 测试用例
// 第一个then方法中的错误要在第二个then方法中捕获到
promise3.then(value => {
    console.log(1)
    console.log('resolve', value)
    throw new Error('then error')
}, reason => {
    console.log(2)
    console.log('reason', reason.message)
}).then(value => {
    console.log(3)
    console.log(value);
}, reason => {
    console.log(4)
    console.log('reason', sreason.message)
})