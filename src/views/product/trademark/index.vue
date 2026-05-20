<template>
 <div>
    <el-card class="card">
      <el-button type="primary" size="default" icon="Plus">添加品牌</el-button>
      <el-table border :data="trademarkArr" style="margin: 10px 0px;" v-loading="loading">
        <el-table-column label="序号" type="index" width="80px" align="center"></el-table-column>
        <el-table-column label="品牌名称" prop="tmName" width="" align="center"></el-table-column>
        <el-table-column label="品牌logo" align="center">
          <template #="{ row }">
            <el-image :src="row.logoUrl" style="width: 100px; height: 100px" lazy>
              <template #placeholder>
                <el-icon class="is-loading" style="width: 100px; height: 100px; margin: 0 auto;">
                  <Loading />
                </el-icon>
              </template>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column label="操作" prop="" width="" align="center">
          <template #="{ }">
            <el-button type="primary" size="default" icon="Edit">编辑</el-button>
            <el-button type="primary" size="default" icon="Delete">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination v-model:current-page="pageNo" v-model:page-size="limit" :page-sizes="[1, 3, 5, 7]"
        size="default" :disabled="false" :background="true" layout="prev, pager, next, jumper, ->, sizes, total"
        :total="total" />
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { reqTrademark } from "@/api/product/trademark";
import type { Records } from "@/api/product/trademark/type";

let pageNo = ref<number>(1);
let limit = ref<number>(1);
let total = ref<number>(0);
let trademarkArr = ref<Records>([]);
let loading = ref<boolean>(false)
let isResetting = ref<boolean>(false)

const getTrademark = async () => {
  loading.value = true
  const result = await reqTrademark(pageNo.value, limit.value)
  if(result.code === 200){
    total.value = result.data.total;
    trademarkArr.value = result.data.records;
    loading.value = false
  }
}

onMounted(() => {
  getTrademark();
})

watch([pageNo, limit],([newPage, newLimit], [_oldPage, oldLimit]) => {
  if (isResetting.value) {
    isResetting.value = false
    return
  }
  if (newLimit !== oldLimit && newPage !== 1) {
    isResetting.value = true
    pageNo.value = 1
  }
  getTrademark()
})
</script>

<style lang="scss" scoped>

</style>