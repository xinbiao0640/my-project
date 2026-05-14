<template>
  <div class="layout_container">
    <div class="layout_menu" :class="{folded: settingStore.isFolded}">
      <Logo :is-folded="settingStore.isFolded" />
      <el-scrollbar class="scrollbar">
        <el-menu :collapse="settingStore.isFolded" :default-active="$route.path">
          <Menu :menuList="userStore.menuRoutes"> </Menu>
        </el-menu>
      </el-scrollbar>
    </div>

    <div class="layout_tabbar" :class="{folded: settingStore.isFolded}">
      <Tabbar />
    </div>

    <div class="layout_content" :class="{folded: settingStore.isFolded}">
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
import useLayoutSettingStore from '@/store/moudules/setting';

const userStore = useUserStore();
const settingStore = useLayoutSettingStore();

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
    transition: all 0.3s;
    .scrollbar {
      width: 100%;
      height: calc(100vh - 50px);
      margin: 0 auto; 
      .el-menu{
        border-right: 0px;
        --el-menu-bg-color: $base-menu-background-color;
        --el-menu-text-color: #ffffff;
        --el-menu-active-color: #409EFF;
      }
    }
    &.folded {
      width: $base-menu-folded-width;
    }
  }

  .layout_tabbar {
    position: fixed;
    top: 0;
    left: $base-menu-width;
    width: calc(100% - $base-menu-width);
    height: $base-tabbar-height;
    background-color: $base-tabbar-background-color;
    transition: all 0.3s;
    &.folded {
      width: calc(100% - $base-menu-folded-width);
      left: $base-menu-folded-width;
    }
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
    transition: all 0.3s;
    &.folded {
      width: calc(100% - $base-menu-folded-width);
      left: $base-menu-folded-width;
    }
  }
}
</style>