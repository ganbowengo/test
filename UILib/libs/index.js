/*
 * @Descripttion: 
 * @Author: ganbowen
 * @Date: 2020-02-12 15:30:46
 * @LastEditors  : ganbowen
 * @LastEditTime : 2020-02-12 17:09:51
 */
import Button from './components/button'

const components = {
    Button
}

const install = function (Vue) {
    components.forEach(component => {
        Vue.component(component.name, component)
    });
}

export default {
    install,
    ...components
}