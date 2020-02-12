<!--
 * @Descripttion: 
 * @Author: ganbowen
 * @Date: 2020-02-04 14:35:19
 * @LastEditors  : ganbowen
 * @LastEditTime : 2020-02-04 16:57:45
 -->
<template>
    <div class="home">
        <HelloWorld msg="我是子应用1的Home" />
    </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
    name: "home",
    components: {
        HelloWorld
    },
    data() {
        return {
            dialogVisible: false
        };
    }
};
</script>
