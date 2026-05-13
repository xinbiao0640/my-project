<template>
  <div class="layout_container">
    <div class="layout_menu">
      <Logo />
      <el-scrollbar class="scrollbar">
        <el-menu background-color="$base-menu-background-color" text-color="#ffffff" active-text-color="#409EFF">
          <Menu :menuList="userStore.menuRoutes"> </Menu>
        </el-menu>
      </el-scrollbar>
    </div>

    <div class="layout_tabbar">
      <Tabbar />
    </div>

    <div class="layout_content">
      <Main></Main>
    </div>
  </div>
</template>

<script setup lang="ts">
import Logo from './logo/index.vue';
import Menu from './menu/index.vue';
import Tabbar from './tabbar/index.vue';
import Main from './main/index.vue';
import { ElScrollbar } from 'element-plus';
import useUserStore from '@/store/moudules/user';

let userStore = useUserStore();
</script>

<style lang="scss" scoped>
.layout_container {
  width: 100%;
  height: 100vh;
  //background-color: #000000;

  .layout_menu {
    width: $base-menu-width;
    height: 100vh;
    background-color: $base-menu-background-color;
    .scrollbar {
      width: 100%;
      height: calc(100vh - 50px);
      .el-menu{
        border-right: 0px;
      }
    }
  }

  .layout_tabbar {
    position: fixed;
    top: 0;
    left: $base-menu-width;
    width: calc(100% - $base-menu-width);
    height: $base-tabbar-height;
    background-color: $base-tabbar-background-color;
  }
  .layout_content {
    position: absolute;
    top: $base-tabbar-height;
    left: $base-menu-width;
    width: calc(100% - $base-menu-width );
    height: calc(100vh - $base-tabbar-height);
    background-color: $base-content-background-color;
    padding: 20px;
    overflow: auto;
  }
}
</style>