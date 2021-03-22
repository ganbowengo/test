/*
 * @Author       : ganbowen
 * @Date         : 2021-03-22 20:00:10
 * @LastEditors  : ganbowen
 * @LastEditTime : 2021-03-22 20:32:32
 * @Descripttion : 
 */
const acorn = require('acorn')
const fs = require('fs')
const JSEmitter = require('./js-emitter')
const args = process.argv[2]
const buffer = fs.readFileSync(args).toString()

const body = acorn.parse(buffer).body
const jsEmitter = new JSEmitter()

// 存储函数或变量声明节点
let decls = new Map()
// 存储真正使用的节点
let calledDecls = []
// 存储未使用的节点
let code = []

// 遍历处理
body.forEach(function(node) {
    if (node.type == "FunctionDeclaration") {
        const code = jsEmitter.run([node])
        decls.set(jsEmitter.visitNode(node.id), code)
        return;
    }
    if (node.type == "ExpressionStatement") {
        if (node.expression.type == "CallExpression") {
            const callNode = node.expression
            calledDecls.push(jsEmitter.visitIdentifier(callNode.callee))
            const args = callNode.arguments
            for (const arg of args) {
                if (arg.type == "Identifier") {
                    calledDecls.push(jsEmitter.visitNode(arg))
                }
            }
        }
    }
    if (node.type == "VariableDeclaration") {
        const kind = node.kind
        for (const decl of node.declarations) {
            decls.set(jsEmitter.visitNode(decl.id), jsEmitter.visitVariableDeclarator(decl, kind))
        }
        return
    }
    if (node.type == "Identifier") {
        calledDecls.push(node.name)
    }
    console.log('node', node)
    code.push(jsEmitter.run([node]))
});

// 生成 code
code = calledDecls.map(c => {
    return decls.get(c)
}).concat([code]).join('')
fs.writeFileSync('test.shaked.js', code)