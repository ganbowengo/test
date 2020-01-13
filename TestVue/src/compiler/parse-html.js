/*
 * @Descripttion: 
 * @Author: ganbowen
 * @Date: 2020-01-11 10:46:40
 * @LastEditors  : ganbowen
 * @LastEditTime : 2020-01-13 16:26:51
 */

/**
    + {1,n}
    * {0,n}
    ? {0,1}
    ?: 禁止使用分组    
*/
const {
    isIgnoreNewlineTag,
    isPlainTextElement,
    isUnaryTag,
    shouldDecodeNewlinesForHref,
    shouldDecodeNewlines } = require('./utils')
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
const decodingMap = {
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&amp;': '&',
    '&#10;': '\n',
    '&#9;': '\t',
    '&#39;': "'"
}
const reCache = {}
const encodedAttr = /&(?:lt|gt|quot|amp|#39);/g
const encodedAttrWithNewLines = /&(?:lt|gt|quot|amp|#39|#10|#9);/g
function decodeAttr(value, shouldDecodeNewlines) {
    const re = shouldDecodeNewlines ? encodedAttrWithNewLines : encodedAttr
    return value.replace(re, match => decodingMap[match])
}

const shouldIgnoreFirstNewline = (tag, html) => tag && isIgnoreNewlineTag(tag) && html[0] === '\n'

function parseHTML(html, options = {}) {
    const stack = []
    let lastTag
    let index = 0
    while (html) {
        if (!lastTag || !isPlainTextElement(lastTag)) { // 正常元素
            let textEnd = html.indexOf('<')
            if (textEnd === 0) {
                // 注释
                if (comment.test(html)) {
                    const commentEnd = html.indexOf('-->')
                    if (commentEnd >= 0) {
                        advance(commentEnd + 3)
                        continue
                    }
                }

                // hack
                if (conditionalComment.test(html)) {
                    // const commentEnd = html.indexOf('>')
                    if (commentEnd >= 0) {
                        advance(commentEnd + 2)
                        continue
                    }
                }

                // doctype
                let docMatch = html.match(doctype)
                if (docMatch) {
                    advance(docMatch[0].length)
                    continue
                }

                // 结束标签
                let endMatch = html.match(endTag)
                if (endMatch) {
                    let curIndex = index
                    advance(endMatch[0].length)
                    parseEndTag(endMatch[1], curIndex, index)
                    continue
                }

                // 开始标签
                let startMatch = parseStartTag()
                if (startMatch) {
                    handleStartTag(startMatch)
                    if (shouldIgnoreFirstNewline(startMatch.tagName, html)) {
                        advance(1)
                    }
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
            const stackedTag = lastTag.toLowerCase()
            const reStackedTag = reCache[stackedTag] || (reCache[stackedTag] = new RegExp(`([\\s\\S]*?)(</${stackedTag}[^>]*>)`, 'i'))
            const rest = html.replace(reStackedTag, function (all, text) {
                if (options.chars) {
                    options.chars(text)
                }
                return ''
            })
            index += html.length - rest.length
            html = rest
            parseEndTag(stackedTag)
        }
    }
    parseEndTag()
    function advance(n) {
        index += n
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

    function handleStartTag(match) {
        let { tagName, unarySlash } = match
        const unary = isUnaryTag(tagName) || !!unarySlash
        const l = match.attrs.length
        const attrs = new Array(l)
        for (let i = 0; i < l; i++) {
            const args = match.attrs[i]
            const value = args[3] || args[4] || args[5] || ''
            const shouldDecodeNewline = tagName === 'a' && args[1] === 'href'
                ? shouldDecodeNewlinesForHref
                : shouldDecodeNewlines
            attrs[i] = {
                name: args[1],
                value: decodeAttr(value, shouldDecodeNewline)
            }
        }

        if (!unary) {
            stack.push({ tag: tagName, lowerCasedTag: tagName.toLowerCase(), attrs: attrs, start: match.start, end: match.end })
            lastTag = tagName
        }
        if (options.start) {
            options.start(tagName, attrs, unary)
        }
    }

    function parseEndTag(tagName, start, end) {
        if (!start) start = index
        if (!end) end = index
        let pos, lowerCasedTagName
        if (tagName) {
            lowerCasedTagName = tagName.toLowerCase()
            for (pos = stack.length - 1; pos >= 0; pos--) {
                if (stack[pos].lowerCasedTag === lowerCasedTagName) {
                    break
                }
            }
        } else {
            pos = 0
        }

        if (pos >= 0) {
            for (let i = stack.length - 1; i >= pos; i--) {
                if (options.end) {
                    options.end(stack[i].tag, start, end)
                }
            }
            stack.length = pos
            lastTag = pos && stack[pos - 1].tag
        } else if (lowerCasedTagName === 'br') {
            if (options.start) {
                options.start(tagName, [], true)
            }
        } else if (lowerCasedTagName === 'p') {
            if (options.start) {
                options.start(tagName, [], false)
            }
            if (options.end) {
                options.end(tagName)
            }
        }
    }
    return stack
}

module.exports = {
    parseHTML
}