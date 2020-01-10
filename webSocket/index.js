/*
 * @Descripttion: 
 * @Author: ganbowen
 * @Date: 2020-01-10 16:23:02
 * @LastEditors  : ganbowen
 * @LastEditTime : 2020-01-10 19:34:02
 */
function WebSocketClass(url, callback, name = 'default', type = 'heart') {
    this.url = url
    this.callback = callback
    this.name = name
    this.type = type
    this.ws = null // 当前websocket的实例
    this.status = null //websocket的状态
}

WebSocketClass.prototype.connect = function (data) {
    const _this = this
    const ws = new WebSocket(this.url)
    _this.ws = ws
    ws.onopen = function (e) {
        _this.status = 'open'
        if (_this.type === 'heart') {
            _this.heart()
        }
        if (data) {
            ws.send(data)
        }
    }
    ws.onmessage = function (e) {
        if (_this.type === 'heart') {
            if (e.data === 'pong') {
                this.pingPong = 'pong'; // 服务器端返回pong,修改pingPong的状态
            }
        }
        _this.callback(e.data)
    }
    ws.onclose = function (e) {
        _this.closeHandle(e)
    }
    ws.onerror = function (e) {
        _this.closeHandle(e)
    }
}

WebSocketClass.prototype.heart = function (interval = 10000) {
    this.pingPong = 'ping'
    this.pingSetInterval = setInterval(() => {
        this.send('ping')
    }, interval)
    this.pongSetInterval = setInterval(() => {
        this.pingPong = false;
        if (this.pingPong === 'ping') {
            this.closeHandle('pingPong没有改变为pong'); // 没有返回pong 重启webSocket
        }
        this.pingPong = 'ping'
    }, interval * 2);
}

WebSocketClass.prototype.closeHandle = function (e) {
    if (this.status !== 'close') {
        console.log('异常断开')
        if (this.type === 'heart') {
            if (this.pingSetInterval && this.pongSetInterval) {
                clearInterval(this.pingSetInterval)
                clearInterval(this.pongSetInterval)
                this.pingSetInterval = null
                this.pongSetInterval = null
            }
        }
        this.connect()
    } else {
        console.log('手动关闭')
    }
}

WebSocketClass.prototype.send = function (data) {
    return this.ws.send(data)
}

WebSocketClass.prototype.close = function () {
    this.status = 'close'
    return this.ws.close()
}