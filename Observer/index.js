/*
 * @Descripttion: 
 * @Author: ganbowen
 * @Date: 2020-01-06 15:48:37
 * @LastEditors  : ganbowen
 * @LastEditTime : 2020-01-06 16:40:25
 */


/**
 * 发布-订阅模式
 * 对象间的一对多的关系，当一个对象改变时，所有以来他的对象都收到通知
 * 
 * eg: 张三是香蕉批发商（新鲜香蕉到了，就给水果售卖商打电话） - 发布者
 *     李四和王五是水果售卖商，同时在张三处批发香蕉 - 订阅者（将自己的电话留在发布者处，实现注册）
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

let Ob = function () {
    return {
        dep: {}, // 订阅者集合
        on(eventName, fn) { //订阅
            if (!this.dep[eventName]) this.dep[eventName] = []
            this.dep[eventName].push(fn)
            return fn
        },
        emit(eventName) { //发布消息
            if (this.dep[eventName]) {
                let args = toArray(arguments, 1)
                this.dep[eventName].forEach(cb => {
                    args.length ? cb.apply(this, args) : cb.call(this)
                })
            }
        },
        remove(eventName, fn) { // 取消订阅
            let eventCb = this.dep[eventName]
            if (!fn && eventCb) { // 移除当前eventName 所有订阅回调
                delete this.dep[eventName]
                return
            }
            if (eventCb) {// 移除当前eventName 回调fn订阅
                for (let i = 0, l = eventCb.length; i < l; i++) {
                    if (eventCb[i] === fn) {
                        this.dep[eventName].splice(i, 1)
                        return
                    }
                }
            }
        }
    }
}

let event = new Ob()
let testCb = function () {
    console.log('我不是张三')
}

event.on('test', function (e) {
    console.log(e)
})
event.on('test', testCb)

event.emit('test', 2)
// 2
// 我不是张三

event.remove('test', testCb) // 移除当前的test事件的 fn
event.emit('test', 2)
// 2


let Person1 = {}
let Person2 = {}
Object.assign(Person1, Ob())
Object.assign(Person2, Ob())

Person1.on('Person1', function (e) {
    console.log('Person1', e)
})

Person2.on('Person2', function (e) {
    console.log('Person2', e)
})

Person1.emit('Person1','我可以送西瓜')
Person2.emit('Person2','我可以送苹果')
