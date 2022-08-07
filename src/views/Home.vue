<template>
  <div>
    <el-header class="top-wrap">
    </el-header>
    <el-container class="bottom-wrap">
      <el-aside width="200px">
        <side-bar></side-bar>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import SideBar from '@/components/SideBar.vue';
export default {
  name: "Home",
  components: {
    SideBar,
  },
};
</script>

<style lang="scss" scoped>
.top-wrap {
  width: 100%;
  position: fixed;
  left: 0;
  top: 0;
  background: #2d303a;
  height: 60px;
  z-index: 1000;
}
.bottom-wrap {
    position: absolute;
    top: 60px;
    left: 0;
    width: 100%;
    min-height: calc(100% - 60px);
}
</style>
