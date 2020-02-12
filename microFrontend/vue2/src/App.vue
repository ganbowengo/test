<!--
 * @Descripttion: 
 * @Author: ganbowen
 * @Date: 2020-02-04 14:35:19
 * @LastEditors  : ganbowen
 * @LastEditTime : 2020-02-04 17:02:02
 -->
<
<template>
  <div id="app">
        <HelloWorld msg="子应用2-用户管理"/>
        <router-view/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
    name: "home",
    components: {
        HelloWorld
    }
};
</script>

<style lang="scss">
#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

#nav {
    padding: 30px;
    a {
        font-weight: bold;
        color: #2c3e50;

        &.router-link-exact-active {
            color: #42b983;
        }
    }
}
</style>
