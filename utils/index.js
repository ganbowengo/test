/*
 * @Descripttion: utils
 * @Author: ganbowen
 * @Date: 2020-01-06 17:33:19
 * @LastEditors  : ganbowen
 * @LastEditTime : 2020-01-06 17:36:50
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