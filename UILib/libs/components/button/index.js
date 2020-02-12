/*
 * @Descripttion: 
 * @Author: ganbowen
 * @Date: 2020-02-12 15:30:11
 * @LastEditors  : ganbowen
 * @LastEditTime : 2020-02-12 17:11:18
 */
import Button from './Button'

// 支持按需引入是的 .use插件注册方式
Button.install = function (Vue) {
    Vue.component(Button.name, Button)
}

export default Button