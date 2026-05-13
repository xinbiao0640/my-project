<template>
  <div class="setting">
    <el-button icon="Refresh" size="small" circle></el-button>
    <el-button icon="FullScreen" size="small" circle></el-button>
    <el-button icon="Setting" size="small" circle></el-button>
    <el-avatar :size="24"
        src="https://media.prts.wiki/thumb/2/2d/Avatar_special_20.png/120px-Avatar_special_20.png?v=o0m8l7bqf229a532mkyhlvwxgf1lizv"
        style="margin:0px 10px;" />
    <el-dropdown trigger="click">
        <span>
            admin
            <el-icon style="vertical-align: middle;">
                <ArrowDown />
            </el-icon>
        </span>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item>Action 1</el-dropdown-item>
                <el-dropdown-item>Action 2</el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
  .setting {
    display: flex;
    align-items: center;
    margin:0 10px;
  }
</style>