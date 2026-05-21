<template>
 <el-card style="margin-bottom: 10px;">
    <el-form :inline="true" class="category-form">
      <el-form-item label="一级分类">
        <el-select v-model="categoryStore.c1Id" style="width: 200px" @change="onC1Change" :disabled="disabled">
          <el-option v-for="c1 in categoryStore.c1Arry" :key="c1.id" :label="c1.name" :value="c1.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select v-model="categoryStore.c2Id" style="width: 200px" @change="onC2Change" :disabled="disabled">
          <el-option v-for="c2 in categoryStore.c2Arry" :key="c2.id" :label="c2.name" :value="c2.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select v-model="categoryStore.c3Id" style="width: 200px" @change="onC3Change" :disabled="disabled">
          <el-option v-for="c3 in categoryStore.c3Arry" :key="c3.id" :label="c3.name" :value="c3.id"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
import useCategoryStore from '@/store/moudules/category';
import { onMounted, watch } from 'vue';

defineProps(['disabled']);
const categoryStore = useCategoryStore();
const onC1Change = () => {
  categoryStore.c2Id = undefined;
  categoryStore.c3Id = undefined;
  categoryStore.c2Arry = [];
  categoryStore.c3Arry = [];
  categoryStore.getCategory2();
} 
const onC2Change = () => {
  categoryStore.c3Id = undefined;
  categoryStore.c3Arry = [];
  categoryStore.getCategory3();
} 
const onC3Change = () => {
  return;
} 

watch(() => categoryStore.c3Id, () => {
  categoryStore.getAttr()
})

onMounted(() => {
  categoryStore.getCategory1();
})
</script>

<style lang="scss" scoped>
.category-form {
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  :deep(.el-form-item) {
    align-self: center;
    margin-bottom: 0;
  }
}
</style>