/*
 * @Descripttion: 高阶函数 函数切片
 * @Author: ganbowen
 * @Date: 2021-01-28 14:20:42
 * @LastEditors  : ganbowen
 * @LastEditTime : 2021-03-24 22:11:05
 */

// 函数切片管道化思想 同中间件思想、插件化思想的整体思想一至
// 通过在插件中完成基础类的修饰及业务处理
// 中间件组合原理
// https://kaiwu.lagou.com/course/courseInfo.htm?courseId=584#/detail/pc?id=5923
// https://juejin.cn/book/6891929939616989188/section/6891930292303429644
// 实现中间件的组合 koa为代表
function compose(middleware) {
    // 这里返回的函数，就是上文中的 fnMiddleware
    return function (context, next) {
        let index = -1
        return dispatch(0)

        function dispatch(i) {
        	  // 
            if (i <= index) return Promise.reject(new Error('next() called multiple times'))
            index = i
            // 取出第 i 个中间件为 fn
            let fn = middleware[i]

            if (i === middleware.length) fn = next

            // 已经取到了最后一个中间件，直接返回一个 Promise 实例，进行串联
            // 这一步的意义是保证最后一个中间件调用 next 方法时，也不会报错
            if (!fn) return Promise.resolve()

            try {
                // 把 ctx 和 next 方法传入到中间件 fn 中，并将执行结果使用 Promise.resolve 包装
                // 这里可以发现，我们在一个中间件中调用的 next 方法，其实就是dispatch.bind(null, i + 1)，即调用下一个中间件
                // 下一个中间件将自己的调用权力给予上一个中间件
                return Promise.resolve(fn(context, dispatch.bind(null, i + 1)));
            } catch (err) {
                return Promise.reject(err)
            }
        }
    }
}
/**
compose([() => {}, () => {}])

|| || || ||
\/ \/ \/ \/

function (context, next) {
    let index = -1
    return dispatch(0)
    ...
}
*/

// 函数组合 形成链式调用
function compose(...funcs) {
	return funcs.reduce((a, b) => (...args) => a(b(...args)));
}
/**

compose([fn1, fn2, fn3])(args)
// 调用后
compose(fn1, fn2, fn3)(...args) = > fn1(fn2(fn3(...args)))
f1,f2
// (...args) => f1(f2(...args))
f3
// (f3) => f1(f2(f3(...args)))
 */


const els = [{}, {}]

// 将
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


// 管道化
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
