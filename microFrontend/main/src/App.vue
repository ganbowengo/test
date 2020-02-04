<template>
  <div class='main'>
    <Menu :theme="theme2" @on-open-change="goto" accordion>
        <Submenu name="1">
            <template slot="title">
                <Icon type="ios-paper" />
                内容管理
            </template>
            <MenuItem name="1-1">文章管理</MenuItem>
            <MenuItem name="1-2">评论管理</MenuItem>
            <MenuItem name="1-3">举报管理</MenuItem>
        </Submenu>
        <Submenu name="2">
            <template slot="title">
                <Icon type="ios-people" />
                用户管理
            </template>
            <MenuItem name="2-1">新增用户</MenuItem>
            <MenuItem name="2-2">活跃用户</MenuItem>
        </Submenu>
    </Menu>
    <div v-if="loading">loading</div>
    <div class="appContainer" v-html="content">content</div>
  </div>
</template>

<script>

export default {
    name: 'app',
    props: {
        loading: Boolean,
        content: String,
    },
    data() {
        return {
            theme2: 'light',
            menu: []
        }
    },
    methods: {
        goto(e) {
            console.log('e', e)
            window.history.pushState({}, `vue${2} app`, `/vue${e}`);
        },
    }
}
</script>

<style>
.main {
    display: flex;
}
.appContainer {
    flex-grow: 1;
}
</style>
