<template>
  <div>
    <Category :disabled="scene!==0"/>
    <el-card>
      <div v-show="scene === 0">
        <el-button type="primary" size="default" icon="Plus" :disabled="!categoryStore.c3Id"
          @click="addSpu">添加SPU</el-button>
        <el-table border :data="spuArry" style="margin: 10px 0px;">
          <el-table-column label="序号" type="index" width="80px" align="center"></el-table-column>
          <el-table-column label="SPU名称" prop="spuName" align="center"></el-table-column>
          <el-table-column label="SPU描述" prop="description" align="center">
          </el-table-column>
          <el-table-column label="操作" prop="" align="center">
            <template #="{ row }">
              <el-button type="primary" size="small" icon="Plus" title="添加sku" @click="addSku"></el-button>
              <el-button type="primary" size="small" icon="Edit" title="修改spu" @click="editSpu(row)"></el-button>
              <el-button type="primary" size="small" icon="View" title="查看spu" @click="viewSpu(row)"></el-button>
              <el-popconfirm :title="`确定要删除${row.spuName}吗?`" width="200px" icon-color="red"
                @confirm="deleteSpu(row.id)">
                <template #reference>
                  <el-button type="danger" size="small" icon="Delete" title="删除spu"></el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <Pagination v-model:pageNo="pageNo" v-model:limit="limit" :total="total"/>
      </div>

      <div v-show="scene === 1">
        <SpuForm v-model:scene="scene" ref="spuFormRef"></SpuForm>
      </div>

      <div v-show="scene === 2">
        <SkuForm></SkuForm>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeUnmount, watch } from 'vue';
import useCategoryStore from '@/store/moudules/category';
import { ElMessage } from 'element-plus';
import type { Spu, SpuList, SpuResponse } from '@/api/product/spu/type';
import { reqDeleteSpu, reqSpu } from '@/api/product/spu';
import SkuForm from './skuForm.vue';
import SpuForm from './spuForm.vue';

const pageNo = ref<number>(1);
const limit = ref<number>(3);
const total = ref<number>(0);
const isResetting = ref<boolean>(false)

const categoryStore = useCategoryStore();
const scene = ref<number>(0);
const spuArry = ref<SpuList>([]);
const spuFormRef = ref();
const getSpu = async () =>{
  spuArry.value = []
  if (categoryStore.c3Id === undefined) {
    return;
  }
  const result: SpuResponse = await reqSpu(pageNo.value, limit.value, categoryStore.c3Id);
  if (result.code === 200) {
    spuArry.value = result.data.records;
    total.value = result.data.total;
  } else {
    //todo
  }
}

watch(()=>categoryStore.c3Id, () => {
  getSpu();
})

watch([pageNo, limit],([newPage, newLimit], [_oldPage, oldLimit]) => {
  if (isResetting.value) {
    isResetting.value = false;
    return;
  }
  if (newLimit !== oldLimit && newPage !== 1) {
    isResetting.value = true;
    pageNo.value = 1;
  }
  getSpu();
})

const addSpu = () => {
  const newSpu: Spu = {
    spuName:'', description:'', category3Id: categoryStore.c3Id as number, spuSaleAttrList: [], spuImageList: [],
  } 
  spuFormRef.value.initSpuDate(newSpu);
  scene.value = 1;
}
const addSku = () => {
  scene.value = 2;
}
const editSpu = (row: Spu) => {
  spuFormRef.value.initSpuDate(row);
  scene.value = 1;
}
const viewSpu = (_row: Spu) => {

}
const deleteSpu = async (id: number) => {
  const result: SpuResponse = await reqDeleteSpu(id);
  if (result.code !== 200) {
    ElMessage.error('删除SPU失败: ' + result.message)
    return
  }
  ElMessage.success('删除SPU成功')
  getSpu()
}

onBeforeUnmount(() => {
  categoryStore.$reset();
})
</script>

<style lang="scss" scoped>

</style>