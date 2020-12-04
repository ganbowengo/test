/*
 * @Descripttion: 
 * @Author: ganbowen
 * @Date: 2020-10-15 18:40:40
 * @LastEditors: ganbowen
 * @LastEditTime: 2020-10-16 16:06:52
 */

function deepCopy (obj, map = new WeakMap()) {
    // 原始类型
    if (!isObject(obj) || obj === null || obj === undefined) {
        return obj
    }

    // Function
    if (typeof obj === 'function') {
        return copyFunc(obj)
    }

    // 不可遍历数据
    const isCanMapTypes = [Set, Map, Object, Array]
    if (!isCanMapTypes.includes(obj.constructor)) {
        return copyOther(obj, getType(obj))
    }

    // 循环引用
    if (map.get(obj)) {
        return map.get(obj)
    }

    let cloneObj = obj.constructor === Object ?
        Object.create(new obj.constructor(), Object.getOwnPropertyDescriptor(obj))
        : new obj.constructor()

    // weakMap 
    map.set(obj, cloneObj)

    // Map
    if (obj.constructor === Map) {
        obj.forEach((value, key) => {
            cloneObj.set(key, deepCopy(value, map))
        })
        return cloneObj
    }

    // Set
    if (obj.constructor === Set) {
        obj.forEach((value, key) => {
            cloneObj.add(key, deepCopy(value, map))
        })
        return cloneObj
    }

    // [] {}
    let keys = Object.getOwnPropertyNames(obj).concat(Object.getOwnPropertySymbols(obj))
    keys.forEach(item => {
        cloneObj[item] = deepCopy(obj[item], map)
    })
    return cloneObj
}

function isObject (it) {
    return typeof it === 'object' || typeof it === 'function' && it !== null
}

function getType (it) {
    return Object.prototype.toString.call(it)
}

function copyOther (obj, type) {
    const Ctor = obj.constructor
    switch (type) {
        case '[object Boolean]':
        case '[object Number]':
        case '[object String]':
        case '[object Date]':
        case '[object Error]':
        case '[object RegExp]':
            return new Ctor(obj);
        case '[object Symbol]':
            return eval(obj.toString())
        default:
            return null
    }
}

function copyFunc (func) {
    let paramsReg = /(?<=\().+(?=\)\s+{)/
    let bodyReg = /(?<={)(.|\n)+(?=})/m
    let funcStr = func.toString()
    if (func.prototype) {
        let paramsStr = (paramsReg.exec(funcStr) || [])[0]
        let bodyStr = (bodyReg.exec(funcStr) || [])[0]
        if (bodyStr) {
            if (paramsStr) {
                let params = paramsStr.split(',')
                return new Function(...params, bodyStr)
            } else {
                return new Function(bodyStr)
            }
        } else {
            return null
        }
    } else {
        // 箭头函数
        return eval(funcStr)
    }
}

function test () {
    const map = new Map();
    map.set('key', 'value');
    map.set('ConardLi', 'code秘密花园');

    const set = new Set();
    set.add('ConardLi');
    set.add('code秘密花园');

    const target = {
        field1: 1,
        field2: undefined,
        field3: {
            child: 'child'
        },
        field4: [2, 4, 8],
        empty: null,
        map,
        set,
        bool: new Boolean(true),
        num: new Number(2),
        str: new String(2),
        symbol: Object(Symbol(1)),
        date: new Date(),
        reg: /\d+/,
        error: new Error(),
        func1: () => {
            console.log('code秘密花园');
        },
        func2: function (a, b) {
            return a + b;
        }
    };

    let cloneObj = deepCopy(target)
    console.log('test', cloneObj)
}
test()
