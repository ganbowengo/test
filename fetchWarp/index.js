/*
 * @Author       : ganbowen
 * @Date         : 2021-03-24 20:48:02
 * @LastEditors  : ganbowen
 * @LastEditTime : 2021-03-24 21:38:31
 * @Descripttion : 
 */

function fetchWrap(fetch, middlewares = []){
    if(!middlewares || !middlewares.length) return fetch
    let innerFetch = middleware.length === 1 ? fetch : fetchWrap(fetch, middlewares.slice(1))
    let next = middlewares[0]
    return function extendedFetch(url, options) {
        try {
            return Promise.resolve(next(url, options || {}, innerFetch))
        } catch(err) {
            return Promise.reject(err)
        }
    }
}

// 这里可以接入自己的核心 Fetch 底层实现，比如使用原生 Fetch，或同构的 isomorphic-fetch 等
// let fetch = require('isomorphic-fetch');

// 一个典型的中间件
function middleware(url, options, fetch) {
    // ...
    // 业务扩展
    // ...
    return fetch(url, options);
}

// 一个更改 URL 的中间件
function middleware1(url, options, fetch) {
    console.log('middleware1')
    // modify url or options
    return fetch(url.replace(/^(http:)?/, 'https:'), options);
}

// 一个修改返回结果的中间件
function middleware2(url, options, fetch) {
    console.log('middleware2')
    return fetch(url, options).then(function(response) {
        if (!response.ok) {
            throw new Error(result.status + ' ' + result.statusText);
        }
        if (/application\/json/.test(result.headers.get('content-type'))) {
            return response.json();
        }
        return response.text();
    });
}

// 一个做错误处理的中间件
function middleware3(url, options, fetch) {
    console.log('middleware3')
    // catch errors
    return fetch(url, options).catch(function(err) {
        console.error(err);
        throw err;
    });
}

let fetch = function(url, options) {
    return new Promise((resolve, reject)=>{
        console.log('url, options', url, options)
    })
}

// 扩展 Fetch 中间件
fetch = fetchWrap(fetch, [
    middleware1,
    middleware2,
    middleware3
])
console.log('fetch', fetch)
fetch('http://', {})

// eg +++++++++++++++++++++++++++++++
fetch = fetchWrap(fetch, [middleware1])

// middleware1
fetch = function extendedFetch(url, options) {
    try {
        return Promise.resolve(middleware1(url, options || {}, fetch))
    } catch(err) {
        return Promise.reject(err)
    }
}

// middleware2

fetch = function extendedFetch(url, options) {
    try {
        return Promise.resolve(middleware1(url, options || {}, 
            function extendedFetch(url, options) {
                try {
                    return Promise.resolve(middleware2(url, options || {}, fetch))
                } catch(err) {
                    return Promise.reject(err)
                }
            })
        )
    } catch(err) {
        return Promise.reject(err)
    }
}
