<template>
    <div class="breadcrumb">
        <el-icon @click="foldMenu">
            <component :is="settingStore.isFolded ? 'Expand' : 'Fold' " />
        </el-icon>
        <el-breadcrumb separator-icon="ArrowRight">
            <el-breadcrumb-item v-for="(item,index) in $route.matched" :key="index" :to="{ path: item.path }" v-show="item.meta.title">
                <el-icon style="margin:0 2px; vertical-align: top;">
                    <component :is="item.meta.icon"></component>
                </el-icon>
                <span>{{ item.meta.title }}</span>
            </el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<script setup lang="ts">
import useLayoutSettingStore from '@/store/moudules/setting';
import { useRoute } from 'vue-router'

let route = useRoute()
const settingStore = useLayoutSettingStore();

const foldMenu = () => {
    settingStore.isFolded = !settingStore.isFolded;
}
</script>

<style lang="scss" scoped>
.breadcrumb {
    display: flex;
    align-items: center;
    margin:0px 10px;
    gap:10px;
}
</style>