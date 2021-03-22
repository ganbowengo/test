/*
 * @Author       : ganbowen
 * @Date         : 2021-03-22 21:18:47
 * @LastEditors  : ganbowen
 * @LastEditTime : 2021-03-22 21:58:20
 * @Descripttion : 
 */
const postcss = require('postcss')
const colors = {
    C01: '#eee',
    C02: '#111',
}
const groups = {
    GBK05A: ['C01', 'C02'],
}
const css =  `a {
    color: cc(GBK05A);
}`
let a = postcss([
    require('postcss-nesting'),
    require('./index')({colors, groups}),
]).process(css).stringify()
console.log('a', a)