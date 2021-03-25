/*
 * @Descripttion: js 寄生组合继承
 * @Author: ganbowen
 * @Date: 2020-01-07 10:43:25
 * @LastEditors  : ganbowen
 * @LastEditTime : 2021-03-25 21:25:20
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


// 继承
function inherit(Parent, Child) {
    // 继承父类的原型属性与方法
    Child.prototype = Object.create(Parent.prototype)
    // prototype.constructor 指向构造函数本身
    Child.prototype.constructor = Child
    // 存储超类
    Child.super = Parent
    // 子类构造函数的__proto__指向父类构造器，继承父类的静态方法  Son.__proto__ = Parent
    if (Object.setPrototypeOf)   {
        // setPrototypeOf es6
        Child.setPrototypeOf(Child, Parent)  
    } else if (Child.__proto__) {
        // __proto__ es6 引入，但是部分浏览器早已支持
        Child.__proto__ = Parent
    } else {
        // 兼容 IE10 等陈旧浏览器
        // 将 Parent 上的静态属性和方法拷贝一份到 Child 上，不会覆盖 Child 上的方法
        // 缺点： 属性性和方法的继承我们是静态拷贝的，继承完后续父类的改动不会自动同步到子类。
        for (var k in Parent) {
            if (Parent.hasOwnProperty(k) && !(k in Child)) {
                Child[k] = Parent[k]
            }
        }
    }
}
