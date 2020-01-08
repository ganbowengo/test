/*
 * @Descripttion: utils
 * @Author: ganbowen
 * @Date: 2020-01-06 17:33:19
 * @LastEditors  : ganbowen
 * @LastEditTime : 2020-01-08 15:41:48
 */
function toArray(list, start) {
    start = start || 0;
    let i = list.length - start;
    let ret = new Array(i);
    while (i--) {
        ret[i] = list[i + start];
    }
    return ret
}

function def(obj, key, val, enumerable) {
    Object.defineProperty(obj, key, {
        value: val,
        enumerable: !!enumerable,
        writable: true,
        configurable: true
    })
}

function noop (a, b, c) {}

function isObject(obj){
    return Object.prototype.toString.call(obj) === '[object Object]'
}

module.exports = {
    toArray,
    def,
    noop,
    isObject
}