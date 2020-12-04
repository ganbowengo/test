/*
 * @Descripttion:
 * @Author: ganbowen
 * @Date: 2020-11-25 11:11:18
 * @LastEditors: ganbowen
 * @LastEditTime: 2020-11-26 15:32:27
 */

function mergeObject (main, order) {
    for (var key in order) {
        if (!main.hasOwnProperty(key)) main[key] = order[key]
    }
    return main
}

function Upload (options) {
    this.options = mergeObject(options, {
        size: 1,
        elem: window.document,
        format: ['xls'],
        limit: 10,
        errorFn: function (e) { },
        successFn: function (e) { }
    })
    this.init()
}

var proto = Upload.prototype

// 初始化DOM结构 并绑定点击选择文件事件
proto.init = function () {
    this.elem = this.getDom(this.options.elem)
    this.input = [] // 存储input
    this.files = [] // 存储已选择文件的input
    this.removeBtnArr = [] // 存储删除操作按钮
    this.initDom()
}

proto.initDom = function () {
    this.initAddBtn()
    this.initListBox()
}

proto.initAddBtn = function () {
    var context = this
    var addBtn = document.createElement('div')
    addBtn.innerText = '+'
    addBtn.setAttribute('class', 'add-file')
    this.bindEvent(addBtn, 'click', function () {
        context.addEventCallBack.call(context)
    }, true)
    this.elem.appendChild(addBtn)
}

proto.initListBox = function () {
    var ul = document.createElement('ul')
    ul.setAttribute('class', 'file-list')
    this.listBox = ul
    this.elem.appendChild(ul)
}

proto.initListItem = function (filename, index) {
    var context = this
    var li = document.createElement('li')
    var title = document.createElement('span')
    var remove = document.createElement('span')
    title.innerText = filename
    remove.innerText = '-'
    title.setAttribute('class', 'file-name')
    remove.setAttribute('class', 'file-remove')
    this.bindEvent(remove, 'click', function (e) {
        context.input.splice(index, 1)
        context.files.splice(index, 1)
        context.listBox.removeChild(li)
        context.options.successFn(context.files)
    }, true)
    li.appendChild(title)
    li.appendChild(remove)
    this.listBox.appendChild(li)
}

proto.initInput = function () {
    var input = document.createElement('input')
    input.setAttribute('type', 'file')
    input.setAttribute('name', 'file' + new Date().getTime())
    input.style.cssText += 'display: none;'
    this.input.push(input)
    this.elem.appendChild(input)
    return input
}

proto.addEventCallBack = function () {
    console.log('this', this)
    var context = this
    var index = context.files.length
    var current = this.initInput()
    context.bindEvent(current, 'change', function (e) {
        var target = e.target || window.event.srcElement
        if (context.checkFileSuffix(target) && context.checkFileSize(target)) {
            context.files.push(target)
            context.initListItem(target.value.substring(target.value.lastIndexOf('\\') + 1), index)
            context.options.successFn(context.files)
        }
    }, true)
    current.click()
}

proto.checkFileSuffix = function (target) {
    var suffix = target.value.substring(target.value.lastIndexOf('.') + 1)
    return this.options.format.join('-').indexOf(suffix) > -1
}

proto.checkFileSize = function (target) {
    var maxSize = this.options.limit * 1024 * 1024;
    var fileSize = 0
    if (target.files && target.files[0]) {
        fileSize = (target.files[0] && target.files[0].size) || 0
    } else {
        try {
            target.select();
            target.blur();
            if (document.selection) {
                var path = document.selection.createRange().text;
                var fso = new ActiveXObject("Scripting.FileSystemObject");
                fileSize = fso.GetFile(path).size;
            }
        } catch (exp) {
            this.options.errorFn('请先将浏览器须设置为可使用“ActiveX控件”！')
            return false
        }
    }
    if (maxSize < fileSize) {
        this.options.errorFn('单个文件不能大于' + this.options.limit + 'M，请重新选择！')
    }
    return maxSize > fileSize
}

proto.bindEvent = function (elem, handle, func, isBind) {
    if (document.addEventListener) {
        var eventListener = isBind ? 'addEventListener' : 'removeEventListener';
        elem[eventListener](handle, func);
    } else {
        var eventListener = isBind ? 'attachEvent' : 'detachEvent';
        elem[eventListener]('on' + handle, func);
    }
}

proto.getDom = function (elem) {
    if (typeof elem === 'string') {
        return document.querySelector(elem)
    } else {
        return elem
    }
}
