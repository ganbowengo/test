/*
 * @Descripttion:
 * @Author: ganbowen
 * @Date: 2020-08-05 16:53:09
 * @LastEditors: ganbowen
 * @LastEditTime: 2020-08-06 17:20:10
 */
const axios = require('axios')

// axios.interceptors.request.use(function r (config) {
//     console.log('123', a)
// }, e => {
//     console.log('e', e)
// })

// axios.interceptors.request.use(function r (config) {
//     console.log('123', a)
// }, e => {
//     console.log('eeeee', e)
// })

// axios.interceptors.request.use(function r (config) {
//     console.log('123', a)
// }, e => {
//     console.log('eeeee11111', e)
// })
// console.log('axios', axios({}))

const promise = new Promise((resolve, reject) => {
    reject('12345')
}).catch((e) => {
    try {
        console.log('1', a)
    } catch (e) {
        console.log('ee', e)
    }
}).then((v) => {
    console.log('then-e', v)
}).catch((e) => {
    console.log('catch', e)
})
