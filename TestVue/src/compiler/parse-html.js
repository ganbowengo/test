/*
 * @Descripttion: 
 * @Author: ganbowen
 * @Date: 2020-01-11 10:46:40
 * @LastEditors  : ganbowen
 * @LastEditTime : 2020-01-12 17:31:01
 */

/**
    + {1,n}
    * {0,n}
    ? {0,1}
    ?: 禁止使用分组    
*/
const { makeMap } = require('../utils')
const qname = '[a-zA-Z_][\\w\\-\\.]*'
const qnameCaptrue = `((?:${qname}\\:)?${qname})` // 括号捕获标签名称
const startTagOpen = new RegExp(`^<${qnameCaptrue}`)
const startTagClose = /^\s*(\/?)>/
const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^s"'=<>`]+)))?/
// 匹配任意数量空格开头 + 至少一个非[空格"'<>\/=]的字符 + 任意空格+=+任意空格+(至少一个双引号中的非双引号的字符任意个 | 至少一个单引号中的非单引号的字符任意个 | 至少一个非[空格"'<>\/=]的字符)
const endTag = new RegExp(`^<\\/${qnameCaptrue}[^>]*>`)
const doctype = /^<!DOCTYPE [^>]+>/i
const comment = /^<!\--/
const conditionalComment = /^<!\[/
const isIgnoreNewlineTag = makeMap('textarea,pre', true)
const shouldIgnoreFirstNewline = (tag, html) => tag && isIgnoreNewlineTag(tag) && html[0] === '\n'
function parseHTML(html, options = {}) {
    const stack = []
    let lastTag
    while (html) {
        if (!lastTag) { // 正常元素
            let textEnd = html.indexOf('<')
            if (textEnd === 0) {
                // 注释
                if (comment.test(html)) {
                    const commentEnd = html.indexOf('-->')
                    if (commentEnd >= 0) {
                        if (options.shouldKeepComment) {
                            options.comment(html.substring(4, commentEnd), index, index + commentEnd + 3)
                        }
                        advance(commentEnd + 3)
                        continue
                    }
                }

                // hack
                if (conditionalComment.test(html)) {
                    const commentEnd = html.indexOf(']>')
                    if (commentEnd >= 0) {
                        advance(commentEnd + 2)
                        continue
                    }
                }

                // doctype
                let docMatch = html.match(endTag)
                if (docMatch) {
                    advance(docMatch[0].length)
                    continue
                }

                // 结束标签
                let endMatch = html.match(endTag)
                if (endMatch) {
                    advance(endMatch[0].length)
                    continue
                }

                // 开始标签
                let startMatch = parseStartTag()
                if (startMatch) {
                    if (shouldIgnoreFirstNewline(startMatch.tagName, html)) {
                        advance(1)
                    }
                    stack.push(startMatch)
                    continue
                }
            }

            let text, rest, next
            if (textEnd >= 0) {
                rest = html.slice(textEnd)
                while (!startTagOpen.test(rest) && !endTag.test(rest)) {
                    next = rest.indexOf('<', 1)
                    if (next < 0) break
                    textEnd += next
                    rest = html.slice(textEnd)
                }
                text = html.substring(0, textEnd)
            }

            if (textEnd < 0) {
                text = html
            }

            if (text) {
                advance(text.length)
            }

            if (options.chars && text) {
                options.chars(text)
            }
        } else { // style script textarea

        }

    }

    function advance(n) {
        html = html.substring(n)
    }

    function parseStartTag() {
        const start = html.match(startTagOpen)
        if (start) {
            const match = {
                tagName: start[1],
                attrs: []
            }
            advance(start[0].length)
            let end, attr
            while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
                advance(attr[0].length)
                match.attrs.push(attr)
            }

            if (end) {
                match.unarySlash = end[1] // startTagClose （）中分组的捕获
                advance(end[0].length)
                return match
            }
        }
    }
    console.log('stack', stack)
    return stack
}

let template = `<!DOCTYPE html><template>
<div id='name' class='name' on-click='clickHandle'></div></template>`

parseHTML(template)