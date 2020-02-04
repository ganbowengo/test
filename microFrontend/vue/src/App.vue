<!--
 * @Descripttion: 
 * @Author: ganbowen
 * @Date: 2020-02-04 09:34:53
 * @LastEditors: ganbowen
 * @LastEditTime: 2020-02-04 15:25:42
 -->
<template>
  <div id="app">
    <HelloWorld msg="子应用1"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'app',
  components: {
    HelloWorld
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
