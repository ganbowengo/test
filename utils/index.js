/*
 * @Descripttion: utils
 * @Author: ganbowen
 * @Date: 2020-01-06 17:33:19
 * @LastEditors  : ganbowen
 * @LastEditTime : 2020-01-08 15:42:09
 */
function toArray(list, start) {
    start = start || 0;
    let i = list.length - start;
    let ret = new Array(i);
    while (i--) {
        ret[i] = list[i + start];
    }
    return ret
}
module.exports = {
    toArray
}