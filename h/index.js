/*
 * @Author       : ganbowen
 * @Date         : 2021-02-20 10:48:17
 * @LastEditors  : ganbowen
 * @LastEditTime : 2021-02-20 15:17:23
 * @Descripttion : 高级特性及元编程
 */

const _baseUrl = Symbol('baseUrl')
const _paths = Symbol('paths')

class Router {
    constructor(_baseUrl = './src') {
        this[_baseUrl] = _baseUrl
        this[_paths] = new Set()
    }

    add (path) {
        this[_paths].add(path)
    }

    *[Symbol.iterator] () {
        const baseUrl = this[_baseUrl];
        for (let path of this[_paths]) {
            yield `${baseUrl}/${path}`;
        }
    }
}

class Foo {
    // get [Symbol.toStringTag] () {
    //     return this.constructor.name;
    // }
}

const foo = new Foo();

console.log(foo + '');
