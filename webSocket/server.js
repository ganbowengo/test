/*
 * @Descripttion: websocket server
 * @Author: ganbowen
 * @Date: 2019-12-05 10:14:40
 * @LastEditors  : ganbowen
 * @LastEditTime : 2020-01-10 17:45:08
 */
const WebSocket = require('ws')
const ws = new WebSocket.Server({ port: 7980 }, () => {
    console.log('websocket start')
})
let i = 0
let clients = []
ws.on('connection', (client) => {
    clients.push(client)
    client.on('message', (msg) => {
        if (msg === 'ping') {
            client.send('pong'); // 通过send方法来给前端发送消息
        } else {
            client.send('111');
        }
    })
    client.on('close', (msg) => {
        console.log("关闭服务器连接", i++)
    })
})

/**
 *
 */