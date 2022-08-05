<template>
  <div class="sidebar-wrap">
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>导航一</span>
        </template>
        <el-menu-item index="1-1" @click="clickMenu">选项1</el-menu-item>
        <!-- <el-submenu index="1-4">
          <template slot="title">选项4</template>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-submenu> -->
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'SideBar',
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    clickMenu (val) {
      console.log(val)
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebar-wrap {
  position: fixed;
  left: 0;
  top: 0;
  width: 200px;
  background: #41444c;
  height: 100%;
  padding-top: 80px;
}
</style>