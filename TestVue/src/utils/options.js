/*
 * @Descripttion: 
 * @Author: ganbowen
 * @Date: 2020-01-09 15:21:39
 * @LastEditors  : ganbowen
 * @LastEditTime : 2020-01-09 16:23:43
 */
const LIFE_CYCLE = [
    'create',
    'beforeCreate',
    'mounted'
]

const strats = Object.create(null)

LIFE_CYCLE.forEach(hook => {
    strats[hook] = mergeHook
})

function mergeHook(val) {
    return val ? Array.isArray(val) ? val : [val] : []
}

function mergeOptions(options) {
    for (let key in strats) {
        let start = strats[key]
        options[key] = start(options[key])
    }
    return options
}

module.exports = {
    mergeOptions
}
