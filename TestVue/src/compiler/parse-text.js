/*
 * @Descripttion: 
 * @Author: ganbowen
 * @Date: 2020-01-13 17:06:40
 * @LastEditors  : ganbowen
 * @LastEditTime : 2020-01-13 17:21:52
 */

const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g

function parseText(text) {
    const tagRE = defaultTagRE
    if (!tagRE.test(text)) {
        return
    }
    const tokens = []
    const rawTokens = []
    let lastIndex = tagRE.lastIndex = 0
    let match, index, tokenValue
    while ((match = tagRE.exec(text))) {
        index = match.index
        // push text token
        if (index > lastIndex) {
            rawTokens.push(tokenValue = text.slice(lastIndex, index))
            tokens.push(JSON.stringify(tokenValue))
        }
        // tag token
        tokens.push(`_s(${match[1].trim()})`)
        lastIndex = index + match[0].length
    }
    if (lastIndex < text.length) {
        rawTokens.push(tokenValue = text.slice(lastIndex))
        tokens.push(JSON.stringify(tokenValue))
    }
    return tokens.join('+')
}

module.exports = {
    parseText
}