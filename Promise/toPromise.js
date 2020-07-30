/*
 * @Descripttion: 函数promise 化
 * @Author: ganbowen
 * @Date: 2020-07-30 17:37:20
 * @LastEditors: ganbowen
 * @LastEditTime: 2020-07-30 17:46:34
 */
const fs = require('fs')
let setPromise = function (method) {
    return function () {
        let promise = new Promise((resolve, reject) => {
            let args = Array.prototype.slice.call(arguments, 0)
            args.push((err, value) => {
                if (err) {
                    reject(err)
                }
                resolve(value)
            })
            method.apply(null, args)
        })
        return promise
    }
}

let read = setPromise(fs.readFile)
read('./index.js', 'utf8').then(val => {
    console.log('val', val)
}, err => {
    console.log('err', err)
})
