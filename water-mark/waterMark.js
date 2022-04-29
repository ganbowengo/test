/*
 * @Descripttion: 
 * @Author: ganbowen
 * @Date: 2020-11-30 10:39:28
 * @LastEditors: ganbowen
 * @LastEditTime: 2020-12-02 16:14:45
 */
function mergeObject (main, order) {
    for (var key in order) {
        if (!main.hasOwnProperty(key)) main[key] = order[key]
    }
    return main
}

function WaterMark (options) {
    this.options = mergeObject(options, {
        elem: document.body,
        text: '我是水印'
    })
    this.init()
}

var proto = WaterMark.prototype

// 初始化DOM结构 并绑定点击选择文件事件
proto.init = function () {
    this.elem = this.getDom(this.options.elem)
    this.cacheOffsetParent = this.elem.offsetParent || document.body
    this._t = new Date().getTime()
    this.initWaterMark()
    this.setOffsetParent()
    this.check()
}

proto.initWaterMark = function () {
    this.createBox()
    this.createWaterMark()
}

// 水印第一层
proto.createBox = function () {
    var box = document.createElement('div')
    box.style.cssText = 'position: absolute;width:100%;overflow:hidden;top:0;left:0;bottom:0;pointer-events:none;z-index:-1;'
    box.setAttribute('id', 'box' + this._t)
    this.box = box
}

// 设置水印子元素
proto.createWaterMarkCell = function () {
    var fragment = document.createDocumentFragment()
    for (var i = 0; i < 1000; i++) {
        var span = document.createElement('span')
        span.setAttribute('class', 'water-mark')
        span.innerText = this.options.text
        fragment.appendChild(span)
    }
    this.fragment = fragment
    return fragment
}

// 设置水印二层
proto.createWaterMark = function () {
    var waterMark = document.createElement('div')
    waterMark.style.cssText = 'position: absolute;width:120%;overflow:hidden;top:0;bottom:0;left:0;'
    waterMark.setAttribute('id', 'waterMark' + this._t)
    waterMark.appendChild(this.createWaterMarkCell())
    this.waterMark = waterMark
    this.box.appendChild(waterMark)
    this.elem.appendChild(this.box)
}

// 设置水印定位父元素
proto.setOffsetParent = function () {
    this.sourceInfo = this.cacheOffsetParent.style.cssText
    this.cacheOffsetParent.style.cssText = this.sourceInfo + ';background: transparent;z-index: 0;'
}

// 还原水印定位父元素
proto.resetOffsetParent = function () {
    this.cacheOffsetParent.style.cssText = this.sourceInfo
}

// 定时检测水印
proto.check = function () {
    var context = this
    this.sourceBoxStyle = document.getElementById('box' + context._t).style.cssText
    this.sourceMarkStyle = document.getElementById('waterMark' + context._t).style.cssText
    this.checkTimer = setInterval(function () {
        let currentBox = document.getElementById('box' + context._t)
        let currentMark = document.getElementById('waterMark' + context._t)
        if (!currentBox || currentBox.style.cssText !== context.sourceBoxStyle) {
            context.box.style.cssText = context.sourceBoxStyle
            context.elem && context.elem.appendChild(context.box)
            return
        }
        if (!currentMark || currentMark.style.cssText !== context.sourceMarkStyle) {
            context.waterMark.style.cssText = context.sourceMarkStyle
            currentBox.appendChild(context.waterMark)
            return
        }
    }, 1000)
}

// 清除水印与定时检测
proto.remove = function () {
    clearTimeout(this.checkTimer)
    this.checkTimer = null
    this.resetOffsetParent()
}

proto.getDom = function (elem) {
    if (typeof elem === 'string') {
        return document.querySelector(elem)
    } else {
        return elem
    }
}

export default WaterMark;
