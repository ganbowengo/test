/*
 * @Descripttion: 
 * @Author: ganbowen
 * @Date: 2020-02-04 15:00:31
 * @LastEditors  : ganbowen
 * @LastEditTime : 2020-02-04 16:55:44
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
Vue.use(VueRouter)
const routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
    },
    {
        path: '/home',
        name: 'home',
        component: Home,
    },
    {
        path: '/about',
        name: 'about',
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    }
]
export default routes