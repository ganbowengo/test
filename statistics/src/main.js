/*
 * @Descripttion: 
 * @Author: ganbowen
 * @Date: 2020-02-04 09:32:49
 * @LastEditors  : ganbowen
 * @LastEditTime : 2020-02-05 20:50:35
 */
import Vue from 'vue'
import App from './App.vue'
Vue.config.productionTip = false

import 'view-design/dist/styles/iview.css'
import { Table } from 'view-design'
Vue.component('Table', Table)

export default new Vue({
    el: '#container',
    render: (h) => h(App)
})