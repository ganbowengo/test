/*
 * @Author       : ganbowen
 * @Date         : 2021-03-25 21:37:06
 * @LastEditors  : ganbowen
 * @LastEditTime : 2021-03-26 11:13:09
 * @Descripttion : 二叉树
 */

class Node {
    constructor(value) {
        this.value = value
        this.left = null
        this.right = null
    }
}

// console.log() 输出value的遍历顺序

// 前序遍历
function preOrder(root) {
    if(root) {
        console.log(root.value)
        preOrder(root.left)
        preOrder(root.right)
    }
}


// 中序遍历
function inOrder(root) {
    if(root) {
        inOrder(root.left)
        console.log(root.value)
        inOrder(root.right)
    }
}


// 后序遍历
function postOrder(root) {
    if(root) {
        postOrder(root.left)
        postOrder(root.right)
        console.log(root.value)
    }
}


// 前序遍历
function prevOrder(root) {
    let stack = new Array()
    let prevNode = root
    while (prevNode !== null || stack.length) {
        if(prevNode !== null) {
            console.log('value', prevNode.value)
            stack.push(prevNode)
            prevNode = prevNode.left
        } else {
            const node = stack.pop()
            prevNode = node.right
        }
    }
}

// 中序遍历
function midOrder(root) {
    let stack = new Array()
    let midNode = root
    while (midNode !== null || stack.length) {
        if(midNode !== null) {
            stack.push(midNode)
            midNode = midNode.left
        } else {
            const node = stack.pop()
            console.log('value', node.value)
            midNode = node.right
        }
    }
}


// 中序遍历
function midOrder1(root) {
    let stack = new Array()
    let node = root
    while (node !== null || stack.length) {
        while (node !== null) {
            stack.push(node)
            node = node.left
        }

        if (stack.length) {
            node = stack.pop()
            console.log('value', node.value)
            node = node.right
        }
    }
}


// 后续遍历
function afterOrder(root) {
    let stack = new Array()
    let node = root
    let lastvisit = root
    while (node !== null || stack.length) {
        while(node !== null){
            stack.push(node)
            node = node.left
        }
        node = stack[stack.length - 1]
        if (node.right === null || node.right === lastvisit) {
            console.log('value', node.value)
            stack.pop()
            lastvisit = node
            node = null
        } else {
            node = node.right
        }
    }
}

function maxDeep(root) {
    return root  === null ? 0 : Math.max(maxDeep(root.left), maxDeep(root.right)) + 1
}

function maxDeep1(root) {
    let stack = new Array()
    let node = root
    let deep = 0
    let max = 0
    while (node !== null || stack.length) {
        while (node !== null) {
            stack.push(node)
            node = node.left
            deep++
        }

        if (stack.length) {
            node = stack.pop()
            node = node.right
            if (node) deep-- 
            if(!node) max = Math.max(deep, max)
        }
    }
    return max
}

function afterOrder(root) {
    let stack = new Array()
    let node = root
    let deep = 0
    let max = 0
    while (node !== null || stack.length) {
        while(node !== null){
            stack.push(node)
            node = node.left
            deep++
        }
        node = stack[stack.length - 1]
        if (node.right === null) {
            max = Math.max(deep, max)
            stack.pop()
            node = null
            deep--
        } else {
            node = node.right
        }
    }
}