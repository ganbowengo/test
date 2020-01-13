/*
 * @Descripttion: 
 * @Author: ganbowen
 * @Date: 2020-01-13 15:59:32
 * @LastEditors  : ganbowen
 * @LastEditTime : 2020-01-13 17:22:51
 */
const { parseHTML } = require('./parse-html')
const { parseText } = require('./parse-text')

function createASTElement(
    tag,
    attrs,
    parent
) {
    return {
        type: 1,
        tag,
        attrsList: attrs,
        attrsMap: makeAttrsMap(attrs),
        rawAttrsMap: {},
        // parent,
        children: []
    }
}

function makeAttrsMap(attrs) {
    const map = {}
    for (let i = 0, l = attrs.length; i < l; i++) {
        map[attrs[i].name] = attrs[i].value
    }
    return map
}

function parse(template) {
    let stack = []
    let root
    let currentParent
    let options = {
        start: function (tag, attrs, unary) {
            let element = createASTElement(tag, attrs, currentParent)
            if (!root) {
                root = element
            }
            if (!unary) {
                currentParent = element
                stack.push(element)
            } else {
                closeElement(element)
            }
        },
        end: function () {
            const element = stack[stack.length - 1]
            stack.length -= 1
            currentParent = stack[stack.length - 1]
            closeElement(element)
        },
        chars: function (text) {
            let res, child
            text = text.trim()
            if (text)
                if (res = parseText(text)) {
                    child = {
                        type: 2,
                        expression: res,
                        text
                    }
                } else {
                    child = {
                        type: 3,
                        text
                    }
                }
            if (child) currentParent.children.push(child)
        }
    }
    function closeElement(element) {
        if (stack) {
            currentParent && currentParent.children.push(element)
        }
    }
    parseHTML(template, options)
    console.log('currentParent', JSON.stringify(root, null, '\t'))
}


let template = `<!DOCTYPE html><template>
<!--woshizhangsan-->
<div id='name' class='name' on-click='clickHandle'>{{name}},会走路</div>
<script>
    console.log('stack')
</script>
</template>`

parse(template)