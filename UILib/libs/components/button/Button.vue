<!--
 * @Descripttion: 
 * @Author: ganbowen
 * @Date: 2020-02-12 15:34:08
 * @LastEditors  : ganbowen
 * @LastEditTime : 2020-02-12 15:36:47
 -->
<template>
    <button>
        <slot>{{text}}</slot>
    </button>
</template>

<script>
export default {
    name: "Button",
    props: {
        text: {
            type: [String, Number],
            default: "button"
        }
    }
};
</script>

<style>
</style>