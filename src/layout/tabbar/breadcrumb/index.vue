<template>
    <div class="breadcrumb">
        <el-icon>
            <Expand />
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

</script>

<style lang="scss" scoped>
.breadcrumb {
    display: flex;
    align-items: center;
    margin:0px 10px;
    gap:10px;
}
</style>