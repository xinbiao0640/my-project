<template>
    <template v-if="true" v-for="item in menuList" :key="item.path">
        <el-menu-item :index="item.path" v-if="!item.children && item.meta?.title" @click="goRoute(item.path)">
            <el-icon v-if="item.meta?.icon">
                <component :is="item.meta.icon"></component>
            </el-icon>
            <template #title>
                <span> {{ item.meta.title }} </span>
            </template>
        </el-menu-item>

        <el-sub-menu :index="item.path" v-if="item.children && item.meta?.title">
            <template #title>
                <el-icon v-if="item.meta?.icon">
                    <component :is="item.meta.icon"></component>
                </el-icon>
                <span> {{ item.meta.title }} </span>
            </template>
            <SidebarMenu :menuList="item.children"> </SidebarMenu>
        </el-sub-menu>

        <template v-if="item.children && !item.meta?.title">
            <SidebarMenu :menuList="item.children"> </SidebarMenu>
        </template>
    </template>
</template>

<script setup lang="ts">
import type { RouteRecordRaw } from 'vue-router'
import { useRouter } from 'vue-router'

let router = useRouter()
defineOptions({
  name: 'SidebarMenu'
})
defineProps({
  menuList: {
    type: Array<RouteRecordRaw>,
    required: true
  }
})

const goRoute = (path: string) => {
  router.push(path)
}
</script>

<style lang="scss" scoped>

</style>