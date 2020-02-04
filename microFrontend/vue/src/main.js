/*
 * @Descripttion: 
 * @Author: ganbowen
 * @Date: 2020-02-04 09:34:53
 * @LastEditors  : ganbowen
 * @LastEditTime : 2020-02-04 15:01:02
 */
import './public-path';
import Vue from 'vue'
import VueRouter from 'vue-router';
import App from './App.vue'
import routes from './router'

Vue.config.productionTip = false
let router = null;
let instance = null;

function render() {
    router = new VueRouter({
        base: window.__POWERED_BY_QIANKUN__ ? '/vue2' : '/',
        mode: 'history',
        routes,
    });

    instance = new Vue({
        router,
        render: h => h(App),
    }).$mount('#app');
}

if (!window.__POWERED_BY_QIANKUN__) {
    render();
}

export async function bootstrap() {
    console.log('vue app bootstraped');
}

export async function mount(props) {
    console.log('props from main framework', props);
    render();
}

export async function unmount() {
    instance.$destroy();
    instance = null;
    router = null;
}