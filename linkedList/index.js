/*
 * @Descripttion: 
 * @Author: ganbowen
 * @Date: 2020-01-02 15:11:05
 * @LastEditors: ganbowen
 * @LastEditTime: 2021-01-28 19:16:54
 */


function createList (arr) {
    function Node (val) {
        this.val = val
        this.next = null
    }
    let result = null
    arr.reduce((a, b) => {
        if (a instanceof Node) {
            a.next = b !== null ? new Node(b) : null
        } else {
            result = a = new Node(a)
            a.next = new Node(b)
        }
        return a.next
    })
    return result
}

let list = createList([1, 2, 3, 4])
console.log('list', list)


function reverse (list) {
    if (list === null || list.next === null) {
        return list
    }
    let newList = reverse(list.next)
    list.next.next = list
    list.next = null
    return newList
}

// 双指针 
// prev 在后 
// current在前
function reverse1 (list) {
    let prev = null
    let current = list
    while (current) {
        let temp = current.next
        current.next = prev
        prev = current
        current = temp
    }
    return prev
}

console.log('list2', reverse1(list))


