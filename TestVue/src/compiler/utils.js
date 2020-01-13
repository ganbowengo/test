/*
 * @Descripttion: 
 * @Author: ganbowen
 * @Date: 2020-01-13 10:54:02
 * @LastEditors  : ganbowen
 * @LastEditTime : 2020-01-13 11:29:51
 */
const { makeMap } = require('../utils')
let inBrowser = typeof window !== 'undefined'
const isUnaryTag = makeMap(
    'area,base,br,col,embed,frame,hr,img,input,isindex,keygen,' +
    'link,meta,param,source,track,wbr'
)

// Elements that you can, intentionally, leave open
// (and which close themselves)
const canBeLeftOpenTag = makeMap(
    'colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr,source'
)

// HTML5 tags https://html.spec.whatwg.org/multipage/indices.html#elements-3
// Phrasing Content https://html.spec.whatwg.org/multipage/dom.html#phrasing-content
const isNonPhrasingTag = makeMap(
    'address,article,aside,base,blockquote,body,caption,col,colgroup,dd,' +
    'details,dialog,div,dl,dt,fieldset,figcaption,figure,footer,form,' +
    'h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,legend,li,menuitem,meta,' +
    'optgroup,option,param,rp,rt,source,style,summary,tbody,td,tfoot,th,thead,' +
    'title,tr,track'
)

const isIgnoreNewlineTag = makeMap('textarea,pre', true)
const isPlainTextElement = makeMap('script,style,textarea', true)
let div;
function getShouldDecode(href) {
    div = div || document.createElement('div');
    div.innerHTML = href ? "<a href=\"\n\"/>" : "<div a=\"\n\"/>";
    return div.innerHTML.indexOf('&#10;') > 0
}

let shouldDecodeNewlines = inBrowser ? getShouldDecode(false) : false;
let shouldDecodeNewlinesForHref = inBrowser ? getShouldDecode(true) : false;

module.exports = {
    isUnaryTag,
    canBeLeftOpenTag,
    isNonPhrasingTag,
    isIgnoreNewlineTag,
    shouldDecodeNewlines,
    isPlainTextElement,
    shouldDecodeNewlinesForHref
}