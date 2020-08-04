/*
 * @Descripttion: 内存泄漏分析
 * @Author: ganbowen
 * @Date: 2020-07-31 17:29:13
 * @LastEditors: ganbowen
 * @LastEditTime: 2020-07-31 17:50:08
 */
const heapdump = require('heapdump')
const http = require('http')
const leakArr = []
let leak = function () {
    leakArr.push('leak' + Math.random())
}
http.createServer(function (req, res) {
    leak()
    res.writeHead(200, { 'Content-Type': 'text/plain' })
    res.end('Hello World!')
}).listen(3002)