<template>
 <div>
    <el-card class="card">
      <el-button type="primary" size="default" icon="Plus" @click="addTrademark">添加品牌</el-button>
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
          <template #="{ row }">
            <el-button type="primary" size="default" icon="Edit" @click="editTrademark(row)">编辑</el-button>
           <el-popconfirm :title="`确定要删除${row.tmName}吗?`" width="200px" icon-color="red" @confirm="deleteTrademark(row.id)">
              <template #reference>
               <el-button type="danger" size="default" icon="Delete">删除</el-button>
              </template>
            </el-popconfirm>
            
          </template>
        </el-table-column>
      </el-table>
      <Pagination v-model:pageNo="pageNo" v-model:limit="limit" :total="total"/>
    </el-card>

  <el-dialog v-model="dialogFormVisible" :title="trademarkForm.id?'修改品牌':'添加品牌'" width="600" @closed="dialogClosed">
      <el-form :model="trademarkForm" :rules="rules" ref="formRef">
        <el-form-item label="品牌名称" prop="tmName" >
          <el-input placeholder="请输入品牌名称" v-model="trademarkForm.tmName" style="width: 80%;"></el-input>
        </el-form-item>
        <el-form-item label="品牌logo" prop="logoUrl">
          <el-upload class="uploader"
          action="/api/admin/product/fileUpload"
          :headers="headers"
          :show-file-list="false"
          :on-success="handleSuccess"
          :before-upload="beforeUpload">
            <img v-if="trademarkForm.logoUrl" :src="trademarkForm.logoUrl" class="uploader-logo"></img>
            <el-icon class="uploader-icon" v-else><upload-filled /></el-icon>
          </el-upload>
        </el-form-item>
      </el-form>
     <template #footer>
       <el-button type="default" size="default" @click="cancel">取消</el-button>
        <el-button type="primary" size="default" @click="confirm">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, reactive } from 'vue';
import { reqTrademark, reqAddOrUpdateTrademark, reqDeleteTrademark } from "@/api/product/trademark";
import type { Records, Trademark } from "@/api/product/trademark/type";
import useUserStore from '@/store/moudules/user'
import { ElMessage, type UploadProps } from 'element-plus'

const userStore = useUserStore()
const headers = {Token: userStore.token}

const pageNo = ref<number>(1);
const limit = ref<number>(1);
const total = ref<number>(0);
const trademarkArr = ref<Records>([]);
const loading = ref<boolean>(false)
const isResetting = ref<boolean>(false)
const dialogFormVisible = ref<boolean>(false)
const formRef = ref();
const trademarkForm = reactive<Trademark>({
  tmName: '',
  logoUrl: '',
})

const getTrademark = async () => {
  loading.value = true
  const result = await reqTrademark(pageNo.value, limit.value)
  if(result.code === 200){
    total.value = result.data.total;
    trademarkArr.value = result.data.records;
    loading.value = false;
  } else {
    ElMessage.error('获取品牌信息失败');
  }
}
const addTrademark = () => {
  dialogFormVisible.value = true;
}
const editTrademark = (row: Trademark) => {
  trademarkForm.id = row.id;
  trademarkForm.tmName = row.tmName;
  trademarkForm.logoUrl = row.logoUrl;
  dialogFormVisible.value = true;
}
const deleteTrademark = async (id: number) => {
  const result = await reqDeleteTrademark(id);
  if(result.code === 200){
    getTrademark();
    ElMessage.success('删除品牌成功');
  } else {
    ElMessage.success('删除品牌失败');
  }
}
const dialogClosed = () => {
  trademarkForm.id = undefined;
  trademarkForm.tmName = '';
  trademarkForm.logoUrl = '';
  formRef.value.clearValidate('tmName');
  formRef.value.clearValidate('logoUrl');
}
const beforeUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type !== 'image/jpeg' && rawFile.type !== 'image/png' && rawFile.type !== 'image/gif') {
    ElMessage.error('文件格式错误!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 5) {
    ElMessage.error('文件大小不能超过5MB!')
    return false
  }
  return true
}
const handleSuccess: UploadProps['onSuccess'] = (response, _uploadFile) => {
  //trademarkForm.logoUrl = URL.createObjectURL(_uploadFile.raw!)
  trademarkForm.logoUrl = response.data;
  formRef.value.clearValidate('logoUrl');
}
const cancel = () => {
  dialogFormVisible.value = false;
}
const confirm = async () => {
  await formRef.value.validate();
  const result = await reqAddOrUpdateTrademark(trademarkForm)
  if(result.code === 200){
    dialogFormVisible.value = false;
    ElMessage.success(trademarkForm.id?'修改品牌成功':'添加品牌成功')
    getTrademark()
  } else {
    ElMessage.error(trademarkForm.id?'修改品牌失败':'添加品牌失败')
  }

}
const validatorTmName = (_rule: any, value: any, callBack: any) => {
  if(value.trim().length >= 2) {
    callBack();
  } else {
    callBack(new Error('品牌名称不得小于两位'));
  }
}
const validatorLogoUrl = (_rule: any, value: any, callBack: any) => {
  if(value) {
    callBack();
  } else {
    callBack(new Error('请上传品牌logo'));
  }
}
const rules = {
  tmName:[
    { required: true, validator:validatorTmName, trigger: 'blur' }
  ],
  logoUrl:[
    { required: true, validator:validatorLogoUrl }
  ]
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
.uploader .uploader-logo {
  width: 200px;
  height: 200px;
  display: block;
}

.uploader{
  line-height: 0px;
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  padding: 0px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.uploader:hover {
  border-color: var(--el-color-primary);
}

.el-upload-dragger{
  padding: 0px;
}
.el-icon.uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 200px;
  height: 200px;
  text-align: center;
}
</style>