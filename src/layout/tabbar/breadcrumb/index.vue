<template>
    <div class="breadcrumb">
        <el-icon @click="foldMenu">
            <component :is="settingStore.isFolded ? 'Expand' : 'Fold' " />
        </el-icon>
        <el-breadcrumb separator-icon="ArrowRight">
            <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/' }">test</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/' }">test</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/' }">detail</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<script setup lang="ts">
import useLayoutSettingStore from '@/store/moudules/setting';
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