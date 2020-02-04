<!--
 * @Descripttion: 
 * @Author: ganbowen
 * @Date: 2020-02-04 09:34:53
 * @LastEditors  : ganbowen
 * @LastEditTime : 2020-02-04 15:02:20
 -->
<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
