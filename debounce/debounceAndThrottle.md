<!--
 * @Descripttion: debounce and throttle
 * @Author: ganbowen
 * @Date: 2020-01-06 20:53:34
 * @LastEditors  : ganbowen
 * @LastEditTime : 2020-01-06 21:36:03
 -->

##### 防抖（debounce）
> wait 为间隔时间

定义：

- 开始边界时，当事件被触发时，触发后的动作(callback)立即执行，在`wait`时间内不再触发事件后，可以再次触发事件
- 结束边界时，当事件被触发时，在`wait`时间内不再触发事件后，执行触发后的动作(callback)

实现方式：

```
/**
 *
 * @param {Function} fn 需要防抖的函数
 * @param {*} wait 等待时间
 * @param {*} immediate 是否立即执行 true 开始边界 false 结束边界
 */
function debounce(fn, wait, immediate = false) {
    let timer
    return function() {
        let args = arguments
        clearTimeout(timer)
        if(immediate) {
            let now = !timer
            timer = setTimeout(() => {
                tiemr = null
            }, wait)
            if(now) fn.call(this, args)
        } else {
            timer = setTimeout(() => {
                fn.call(this, args)
            }, wait)
        }
    }
}
```

##### 节流（throttle）

定义：

- 开始边界时，当事件被触发时，触发后的动作(callback)立即执行，并且在`wait`时间内触发事件，不再执行触发后的动作
- 结束边界时，当事件被触发时，触发后的动作(callback)，在`wait`时间后被执行

实现方式：

```
/**
 * 持续触发时 每隔 wait时间 执行一次
 * @param {Function} fn 需要节流的函数
 * @param {Number} wait 间隔时间
 * @param {Boolean} immediate 是否立即执行 true开始边界  false 结束边界
 */
function throttle(fn, wait, immediate) {
    let timer
    return function () {
        let args = arguments
        if(!timer){
            immediate && fn.call(this, args)
            timer = setTimeout(() => {
                !immediate && fn.call(this, args)
                clearTimeout(timer)
                timer = null
            })
        }
    }
}
```

> 开始边界与结束边界如下图
![手绘开始边界、结束边界 防抖节流图](https://raw.githubusercontent.com/ganbowengo/imgs/master/articleImg/debounceAndThrottle.jpg)