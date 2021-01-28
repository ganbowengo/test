/*
 * @Descripttion: 高阶函数 函数切片
 * @Author: ganbowen
 * @Date: 2021-01-28 14:20:42
 * @LastEditors: ganbowen
 * @LastEditTime: 2021-01-28 17:46:01
 */
const els = [{}, {}]

let funcTemp = ([key, value], el) => {
    el[key] = value
    return [key, value]
}

function continous (reducer) {
    return function (...args) {
        return args.reduce((a, b) => reducer(a, b));
    };
}

let func1 = continous(funcTemp)
// func1 test
func1(['color', 'red'], ...els)


function fold (fn) {
    return function (...args) {
        const lastArg = args[args.length - 1];
        if (lastArg.length) {
            return fn.call(this, ...args.slice(0, -1), ...lastArg);
        }
        return fn.call(this, ...args);
    };
}

let func2 = fold(continous(funcTemp))
// func2 test
func2(['color', 'red'], els)


function reverse (fn) {
    return function (...args) {
        return fn.call(this, args.reverse())
    }
}

let func3 = reverse(fold(continous(funcTemp)))
// func3 test
func3(els, ['color', 'red'])


function spread (fn) {
    return function (first, ...rest) {
        return fn(this, first, rest)
    }
}

let func4 = spread(reverse(fold(continous(funcTemp))))
// func4 test
func4(els, 'color', 'red')


function pipe (...fns) {
    return function (input) {
        return fns.reduce((a, b) => {
            return b.call(this, a)
        }, input)
    }
}

let batch = pipe(continous, fold, reverse, spread)
batch(els, 'color', 'red')



let pipe1 = continous((prev, next) => {
    return function (input) {
        return next.call(this, prev.call(this, input))
    }
})

let batch1 = pipe(continous, fold, reverse, spread)
batch1(els, 'color', 'red')


let once = function (fn) {
    return function (...args) {
        if (fn) {
            let ret = fn.apply(this, args)
            fn = null
            return ret
        }
    }
}

let deprecate = function (fn, oldApi, newApi) {
    const notice = once(console.warn)
    return function (...args) {
        notice(`The ${oldApi} is deprecate, Please use the ${newApi} instead`)
        return fn.apply(this, args)
    }
}

let oldFunc = () => { }

oldFunc = deprecate(oldFunc, 'oldFunc', 'newFunc')

oldFunc()


let intercept = function (fn, { beforeCb = null, afterCb = null }) {
    const notice = once(console.warn)
    return function (...args) {
        if (!beforeCb || beforeCb.apply(this, args) !== false) {
            let ret = fn.apply(this, args)
            if (afterCb) afterCb.apply(this, args)
            return ret
        }
    }
}

// 高阶函数范式

function HOF0 (fn) {
    // 做一些事
    return function (...args) {
        // 做一些事
        return fn.apply(this, args)
    }
}
