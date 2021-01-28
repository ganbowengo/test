/*
 * @Descripttion:
 * @Author: ganbowen
 * @Date: 2021-01-21 10:09:28
 * @LastEditors: ganbowen
 * @LastEditTime: 2021-01-21 10:40:09
 */
// console.time('start')
// setTimeout(function () {
//     let i = 0
//     while (i++ < 10000000000) { }
// }, 1000)


// setTimeout(function () {
//     console.timeEnd('start')
// }, 2000)

let timer = null
function interval (func, wait) {
    let interv = function () {
        func.call(null);
        timer = setTimeout(interv, wait);
    };
    timer = setTimeout(interv, wait);
}
let time = new Date().getTime()
interval(function () {
    let i = 0
    let r = parseInt(Math.random() * 10)
    console.log('', Math.pow(10, r))
    while (i++ < Math.pow(10, r)) { }
    let s = new Date().getTime()
    console.log('date', s - time)
    time = s
}, 1000)