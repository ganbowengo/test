/*
 * @Descripttion: js 寄生组合继承
 * @Author: ganbowen
 * @Date: 2020-01-07 10:43:25
 * @LastEditors  : ganbowen
 * @LastEditTime : 2020-01-10 16:09:49
 */
function Parent(name) {
    this.name = name
}

Parent.see = function () {
    console.log('see')
}

Parent.prototype.say = function () {
    console.log('say')
}

function Son(age, name) {
    // 继承构造方法中的属性
    Parent.call(this, name)
    this.age = age
}

Son.cry = function () {
    console.log('cry')
}

// 继承原型链
Son.prototype = Object.create(Parent.prototype)
Son.prototype.constructor = Son
// 继承类属性方法
Son.__proto__ = Parent

Son.prototype.walk = function () {
    console.log(this.age + '岁的' + this.name + '在走路')
}

var son = new Son(10,'小明')
Son.see() // 继承类方法
son.say() // 继承原型方法
Son.cry()
son.walk()
