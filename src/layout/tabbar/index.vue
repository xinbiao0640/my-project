<template>
  <div class="tabbar">
    <breadcrumb />
    <setting />
  </div>
</template>

<script setup lang="ts">
import Breadcrumb from './breadcrumb/index.vue'
import Setting from './setting/index.vue'
</script>

<style lang="scss" scoped>
.tabbar {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between; 
}
</style>