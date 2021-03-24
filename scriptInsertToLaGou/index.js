/*
 * @Author       : ganbowen
 * @Date         : 2021-03-24 20:03:12
 * @LastEditors  : ganbowen
 * @LastEditTime : 2021-03-24 20:21:28
 * @Descripttion : 干掉拉勾网的header与左侧菜单
 */
function deleteElement (className) {
    let self = document.getElementsByClassName(className)[0]
    self.parentNode.removeChild(self)
}

function resetStyle () {
    let right = document.getElementsByClassName('right-content-wrap')[0] // margin-top: 0;margin-left:150px;
    let header = document.getElementsByClassName('pub-header')[0] // top: 0
    right.style.marginTop = '0'
    right.style.marginLeft= '150px'
    header.style.top= '0'
}

function main () {
    ['pc-header','left-content-wrap'].forEach(item => {
        deleteElement(item)
    })
    resetStyle()
}
main()

