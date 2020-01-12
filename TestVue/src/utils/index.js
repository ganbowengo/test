/*
 * @Descripttion: utils
 * @Author: ganbowen
 * @Date: 2020-01-06 17:33:19
 * @LastEditors  : ganbowen
 * @LastEditTime : 2020-01-12 16:39:09
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

function noop(a, b, c) { }

function isPlainObject(obj) {
    return Object.prototype.toString.call(obj) === '[object Object]'
}

function isObject(obj) {
    return obj !== null && typeof obj === 'object'
}

function makeMap(str, expectsLowerCase) {
    const map = Object.create(null)
    const list = str.split(',')
    for (let i = 0; i < list.length; i++) {
        map[list[i]] = true
    }
    return expectsLowerCase
        ? val => map[val.toLowerCase()]
        : val => map[val]
}

module.exports = {
    toArray,
    def,
    noop,
    isPlainObject,
    isObject,
    makeMap
}