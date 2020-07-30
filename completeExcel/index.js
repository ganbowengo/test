/*
 * @Descripttion:
 * @Author: ganbowen
 * @Date: 2020-07-21 09:48:11
 * @LastEditors: ganbowen
 * @LastEditTime: 2020-07-21 10:09:13
 */
const path = require('path')
const XLSX = require('xlsx')
const workbook = XLSX.readFile(path.resolve('data/testData.xlsx'))
// 获取 Excel 中所有表名
const sheetNames = workbook.SheetNames; // 返回 ['sheet1', 'sheet2']
const list = sheetNames.map(item => {
    const worksheet = workbook.Sheets[item]
    return XLSX.utils.sheet_to_json(worksheet)
})
const obj = {}
list.map(item => {
    item.forEach(it => {
        for (let key in it) {
            if (obj[key]) {
                obj[key].push(it[key])
            } else {
                obj[key] = []
                obj[key].push(it[key])
            }
        }
    })
})

function completeCol (obj, col1, col2) {
    let result = []
    obj[col1].forEach((item, index) => {
        if (item !== obj[col2][index]) {
            result.push(`${col1}与${col2},第${index}行不一致！`)
        }
    })
    return result
}

console.log('list', completeCol(obj, 'age', 'num'))