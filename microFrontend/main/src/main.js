/*
 * @Descripttion: 
 * @Author: ganbowen
 * @Date: 2020-02-04 09:32:49
 * @LastEditors  : ganbowen
 * @LastEditTime : 2020-02-04 15:27:07
 */
import Vue from 'vue'
import App from './App.vue'
Vue.config.productionTip = false

import 'view-design/dist/styles/iview.css'
import { Menu, Submenu, MenuItem, Icon } from 'view-design'
Vue.component('Menu', Menu)
Vue.component('Submenu', Submenu)
Vue.component('MenuItem', MenuItem)
Vue.component('Icon', Icon)

import { registerMicroApps, setDefaultMountApp, start } from 'qiankun';
let app = null
function render({ appContent, loading }) {
    if (!app) {
        app = new Vue({
            el: '#container',
            data() {
                return {
                    content: appContent,
                    loading,
                };
            },
            render(h) {
                return h(App, {
                    props: {
                        content: this.content,
                        loading: this.loading,
                    },
                });
            },
        });
    } else {
        app.content = appContent;
        app.loading = loading;
    }
}
function genActiveRule(routerPrefix) {
    return location => location.pathname.startsWith(routerPrefix);
}

function initApp() {
    render({ appContent: '', loading: true });
}

initApp();

registerMicroApps(
    [
        { name: 'vue app', entry: '//localhost:8001', render, activeRule: genActiveRule('/vue') },
        { name: 'vue2 app', entry: '//localhost:8002', render, activeRule: genActiveRule('/vue2') },
    ],
    {
        beforeLoad: [
            app => {
                console.log('before load', app);
            },
        ],
        beforeMount: [
            app => {
                console.log('before mount', app);
            },
        ],
        afterUnmount: [
            app => {
                console.log('after unload', app);
            },
        ],
    }
);

setDefaultMountApp('/vue2');

start({ prefetch: true });


