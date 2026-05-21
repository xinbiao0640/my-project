<template>
  <div>
    <Category :disabled="scene!==0"/>
    <el-card>
      <div v-show="scene === 0">
        <el-button type="primary" size="default" icon="Plus" :disabled="!categoryStore.c3Id"
          @click="addAttr">添加属性</el-button>
        <el-table border :data="categoryStore.attrArry" style="margin: 10px 0px;">
          <el-table-column label="序号" type="index" width="80px" align="center"></el-table-column>
          <el-table-column label="属性名称" prop="attrName" width="200px" align="center"></el-table-column>
          <el-table-column label="属性值" align="center">
            <template #="{ row }">
              <el-tag v-for="item in row.attrValueList" :key="item.id" style="margin: 0px 5px;"> {{ item.valueName }} </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" prop="" width="200px" align="center">
            <template #="{ row }">
              <el-button type="primary" size="default" icon="Edit" @click="editAttr(row)">编辑</el-button>
              <el-popconfirm :title="`确定要删除${row.attrName}吗?`" width="200px" icon-color="red"
                @confirm="deleteAttr(row.id)">
                <template #reference>
                  <el-button type="danger" size="default" icon="Delete">删除</el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div v-show="scene !== 0">
        <el-form :model="attrForm" ref="formRef">
          <el-form-item label="属性名称" prop="attrName">
            <el-input placeholder="请输入属性名称" v-model="attrForm.attrName" style="width: 250px;"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" size="default" icon="Plus" :disabled="attrForm.attrName?.trim().length === 0" @click="addAttrValue">添加属性值</el-button>
        <el-table border :data="attrForm.attrValueList" style="margin: 10px 0px;">
          <el-table-column label="序号" type="index" width="80px" align="center"></el-table-column>
          <el-table-column label="属性名称" width="200px" align="center">
            <template #default>
              <span>{{ attrForm.attrName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="属性值" align="center">
            <template #="{ row, $index }">
              <el-input placeholder="请输入属性值名称" v-model="row.valueName" v-if="editingMap[$index]||(row.valueName==='')"
               @blur="exitEditValue(row, $index)" @keydown="()=>editingMap[$index] = true" :ref="(el: any) => inputRefs[$index]=el" :input-style="{ textAlign: 'center' }"> </el-input>
              <div v-else>{{ row.valueName }}</div>
            </template>
          </el-table-column>
          <el-table-column label="操作" prop="" width="200px" align="center">
            <template #="{ row, $index }">
              <el-button type="primary" size="default" icon="Edit" @click="editAttrValue(row, $index)">编辑</el-button>
              <el-popconfirm :title="`确定要删除${row.valueName}吗?`" width="200px" icon-color="red" @confirm="deleteAttrValue($index)">
                <template #reference>
                  <el-button type="danger" size="default" icon="Delete">删除</el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-button type="default" size="default" @click="cancel">取消</el-button>
        <el-button type="primary" size="default" :disabled="attrForm.attrValueList.length === 0||attrForm.attrName?.trim().length === 0" @click="save">保存</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { nextTick, ref, toRaw, onBeforeUnmount } from 'vue';
import useCategoryStore from '@/store/moudules/category';
import type { Attr, AttrValue } from '@/api/product/attr/type';
import { reqAddOrUpdateAttr, reqDeleteAttr } from '@/api/product/attr';
import { ElMessage } from 'element-plus';

const categoryStore = useCategoryStore();
const scene = ref<number>(0)
const attrForm = ref<Attr>({
  attrName: '',
  attrValueList: [],
  categoryId: undefined,
  categoryLevel: 3,
})
const inputRefs = ref<any>([]);
const editingMap = ref<Record<number, boolean>>({});
let inputCache: string = '';

const addAttr = () => {
  attrForm.value.attrName = '';
  attrForm.value.attrValueList = [];
  attrForm.value.categoryId = categoryStore.c3Id;
  scene.value = 1;
}
const addAttrValue = async () => {
  attrForm.value.attrValueList.push({ valueName:'' });
  inputCache = '';
  await nextTick();
  const input = inputRefs.value[attrForm.value.attrValueList.length-1];
  input?.focus();
}
const editAttrValue = async (row: AttrValue, $index: number) => {
  editingMap.value = {};
  editingMap.value[$index] = true;
  inputCache = row.valueName;
  await nextTick();
  const input = inputRefs.value[$index];
  input?.focus();
}
const exitEditValue = (row: AttrValue, $index: number) => {
  if(row.valueName.trim() === ''){
    ElMessage.error("属性值不能为空");
    if(!inputCache) {
      attrForm.value.attrValueList.splice($index, 1);
      return;
    }
    row.valueName = inputCache;
    const input = inputRefs.value[$index];
    input?.focus();
    return;
  }
  const repeated = attrForm.value.attrValueList.find((item) => {
    if(item !== row){
      return item.valueName === row.valueName;
    }
  })
  if(repeated){
    ElMessage.error("属性值不能重复");
    if(!inputCache) {
      attrForm.value.attrValueList.splice($index, 1);
      return;
    }
    row.valueName = inputCache;
    const input = inputRefs.value[$index];
    input?.focus();
    return;
  }
  delete editingMap.value[$index]
}
const deleteAttrValue = ($index: number) => {
  attrForm.value.attrValueList.splice($index, 1);
}
const editAttr = (row: Attr) => {
  attrForm.value = structuredClone(toRaw(row));
  scene.value = 2;
}
const deleteAttr = async (row_id: number) => {
  const result = await reqDeleteAttr(row_id);
  if (result.code === 200) {
    scene.value = 0;
    ElMessage.success('删除成功');
    categoryStore.getAttr();
  } else {
    ElMessage.error('删除失败')
  }
}
const cancel = () => {
  scene.value = 0;
}
const save = async () => {
  const result = await reqAddOrUpdateAttr(attrForm.value);
  if (result.code === 200) {
    scene.value = 0;
    ElMessage.success(attrForm.value.id ? '修改属性成功' : '添加属性成功');
    categoryStore.getAttr();
  } else {
    ElMessage.error(attrForm.value.id ? '修改属性失败' : '添加属性失败')
  }
}
onBeforeUnmount(() => {
  categoryStore.$reset();
})
</script>

<style lang="scss" scoped>

</style>