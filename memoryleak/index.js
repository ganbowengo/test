/*
 * @Descripttion: 内存泄漏分析
 * @Author: ganbowen
 * @Date: 2020-07-31 17:29:13
 * @LastEditors: ganbowen
 * @LastEditTime: 2020-08-10 15:30:33
 */
const heapdump = require('heapdump')
// const http = require('http')
// const leakArr = []
// let leak = function () {
//     leakArr.push('leak' + Math.random())
// }
// let server = http.createServer(function (req, res) {
//     console.log('1231', 1231)
//     let i = 10000000
//     while (i < 0) {
//         leak()
//         i--
//     }
//     res.writeHead(200, { 'Content-Type': 'text/plain' })
//     res.end('Hello World!')
// }).listen(3002)
// console.log('Listening on localhost:' + server.address().port)

let leakObject = null
let count = 0
setInterval(function testMemoryLeak () {
    const originLeakObject = leakObject
    const unused = function () {
        if (originLeakObject) {
            console.log('originLeakObject')
        }
    }
    leakObject = {
        count: String(count++),
        leakStr: new Array(1e7).join('*'),
        leakMethod: function () {
            console.log('leakMessage')
        }
    }
}, 1000)