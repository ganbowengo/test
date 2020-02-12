<!--
 * @Descripttion: 
 * @Author: ganbowen
 * @Date: 2020-02-04 14:35:19
 * @LastEditors  : ganbowen
 * @LastEditTime : 2020-02-04 16:18:04
 -->
<template>
  <div class="home">
      <p>Add User</p>
        <i class="el-icon-edit"/>
        <el-button @click="dialogVisible = true" type="text">Open Dialog</el-button>
        <el-dialog
        :before-close="handleClose"
        :visible.sync="dialogVisible"
        title="hit"
        width="30%">
            <span>dialog message</span>
            <span class="dialog-footer" slot="footer">
                <el-button @click="dialogVisible = false">cancel</el-button>
                <el-button @click="dialogVisible = false" type="primary">ok</el-button>
            </span>
        </el-dialog>
  </div>
</template>

<script>
  // @ is an alias to /src
  import HelloWorld from '@/components/HelloWorld.vue';

  export default {
    name: 'home',
    components: {
      HelloWorld,
    },
    data() {
      return {
        dialogVisible: false,
      };
    },
    methods: {
      handleClose(done) {
        this.$confirm('Sure to close？')
          .then(_ => {
            done();
          })
          .catch(_ => {
          });
      },
    },
  };
</script>
