<!--
 * @Descripttion: 
 * @Author: ganbowen
 * @Date: 2020-02-04 09:32:49
 * @LastEditors  : ganbowen
 * @LastEditTime : 2020-02-04 17:06:33
 -->
<template>
    <div class="main">
        <Menu :theme="theme2" @on-select="goto" accordion>
            <Submenu name="1">
                <template slot="title">
                    <Icon type="ios-paper" />内容管理
                </template>
                <MenuItem name="vue1/home">文章管理</MenuItem>
                <MenuItem name="vue1/about">评论管理</MenuItem>
            </Submenu>
            <Submenu name="2">
                <template slot="title">
                    <Icon type="ios-people" />用户管理
                </template>
                <MenuItem name="vue2/home">新增用户</MenuItem>
                <MenuItem name="vue2/about">活跃用户</MenuItem>
            </Submenu>
        </Menu>
        <div v-if="loading">loading</div>
        <div class="appContainer" v-html="content">content</div>
    </div>
</template>

<script>
export default {
    name: "app",
    props: {
        loading: Boolean,
        content: String
    },
    data() {
        return {
            theme2: "light",
            menu: []
        };
    },
    methods: {
        goto(e) {
            let a = e.split("/");
            window.history.pushState({}, `${a} app`, `/${e}`);
        }
    }
};
</script>

<style>
.main {
    display: flex;
}
.appContainer {
    flex-grow: 1;
}
</style>
