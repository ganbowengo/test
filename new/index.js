/*
 * @Descripttion: 
 * @Author: ganbowen
 * @Date: 2020-01-07 15:27:58
 * @LastEditors  : ganbowen
 * @LastEditTime : 2020-01-07 16:08:14
 */


/**
 * 
 * 创建一个对象
 * 
 */

let soldier = {
    id: 1,
    life: 45,
    fire: function () { },
    walk: function () { },
    run: function () { }
}

// 创建100个士兵
let soldiers = []
for (let i = 0; i < 100; i++) {
    soldiers.push({
        id: i,
        life: 45,
        fire: function () { },
        walk: function () { },
        run: function () { }
    })
}

// 有一部分重复创建 life fire walk run 占用大内存

let soldierPro = {
    life: 45,
    fire: function () { },
    walk: function () { },
    run: function () { }
}

{
    let soldiers = []
    for (let i = 0; i < 100; i++) {
        let soldier = {
            id: i,
        }.__proto__ = soldierPro
        soldiers.push(soldier)
    }
}

// 但是这样士兵的属性分散在两个地方 于是改的优雅一点
{

    function soldier(id) {
        let _this = {}
        _this.id = id
        _this.__proto__ = soldierPro
        return _this
    }

    let soldiers = []
    for (let i = 0; i < 100; i++) {
        soldiers.push(soldier(i))
    }
}

// JS之父 的 爱的关怀 创建了new 关键字
{
    function soldier(id) {
        let _this = {} // 创建临时对象 new来
        _this.id = id
        _this.__proto__ = soldierPro // 绑定原型 new来   new 为了知道原型在哪，所以指定原型的名字为 prototype
        return _this // return new来
    }
    /**
     * new 的四件事：
     * 1. 创建临时对象 this
     * 2. 绑定原型
     * 3. return 临时对象
     * 4. 原型命名为prototype
     */
}

{
    function soldier(id) {
        this.id = id
    }
    let soldiers = []
    for (let i = 0; i < 100; i++) {
        soldiers.push(new soldier(i))
    }
}