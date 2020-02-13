/*
 * @Descripttion: 
 * @Author: ganbowen
 * @Date: 2020-02-13 14:26:22
 * @LastEditors  : ganbowen
 * @LastEditTime : 2020-02-13 14:45:51
 */
import Vue from 'vue'
import App from './App'
import button from '../../dist/button/index'
Vue.use(button)

export default new Vue({
    el: '#app',
    render: (h) => h(App)
})