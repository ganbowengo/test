/*
 * @Descripttion: 
 * @Author: ganbowen
 * @Date: 2020-01-02 15:11:05
 * @LastEditors  : ganbowen
 * @LastEditTime : 2020-01-02 22:07:42
 */
function Node(data) {
    this.data = data
    this.next = null
}

function addNode(head, val) {
    let temp = head
    while (temp.next !== null) {
        temp = temp.next
    }
    temp.next = new Node(val)
}

function linkedList(arr) {
    let head = new Node(0)
    for (let i = 0, l = arr.length; i < l; i++) {
        head.next
    }
}
console.log(__dirname,__filename)
