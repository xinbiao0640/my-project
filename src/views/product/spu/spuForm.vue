<template>
    <div>
        <el-form label-width="100px">
            <el-form-item label="SPU名称">
                <el-input placeholder="请输入SPU名称" v-model="spuParams.spuName" style=""></el-input>
            </el-form-item>
            <el-form-item label="SPU品牌">
                <el-select v-model="spuParams.tmId" style="width: 250px;">
                    <el-option v-for="item in trademarkList" :key="item.id" :label="item.tmName" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="SPU名称">
                <el-input placeholder="请输入描述" v-model="spuParams.description" type="textarea" style=""></el-input>
            </el-form-item>
            <el-form-item label="SPU图片">
                <el-upload v-model:file-list="fileList4Upload"
                    action="/api/admin/product/fileUpload" list-type="picture-card"
                    :headers="headers"
                    :on-preview="handlePictureCardPreview" :on-remove="handleRemove"
                    :on-success="handleSuccess">
                    <el-icon><Plus /></el-icon>
                </el-upload>
                <el-dialog v-model="dialogVisible">
                    <img w-full :src="dialogImageUrl" alt="Preview Image" style="width: 100%; height: 100%;"/>
                </el-dialog>
            </el-form-item>
            <el-form-item label="SPU销售属性">
                <el-select v-model="selectedSaleAttrId" :placeholder="unSelectSaleAttr.length ? `${unSelectSaleAttr.length}个未选择` : '无'" style="width: 250px; margin-right: 10px;">
                    <el-option v-for="item in unSelectSaleAttr" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
                <el-button :disabled="selectedSaleAttrId===undefined" type="primary" size="default" icon="Plus" @click="addSaleAttr">添加销售属性</el-button>
                <el-table border :data="saleAttrList" style="margin: 10px 0px;">
                    <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
                    <el-table-column label="属性名" prop="saleAttrName" align="center" width="240px"></el-table-column>
                    <el-table-column label="属性值" align="center">
                        <template #="{ row, $index }">
                            <el-tag v-for="item in row.spuSaleAttrValueList" :key="item.id" closable @close="handleTagClose(row, item)" style="margin-right: 5px;">{{ item.saleAttrValueName }}</el-tag>
                            <el-input v-if="editingMap[$index]" 
                            :ref="(el: any) => inputRefs[$index]=el" 
                            v-model="inputValue[$index]" 
                            size="small" 
                            @keyup.enter="handleTagInputConfirm(row, $index)" 
                            @blur="handleTagInputConfirm(row, $index)" style="width: 100px;"/>
                            <el-button v-else size="small" icon="Plus" @click="showTagInput($index)"></el-button>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" align="center" width="240px">
                        <template #="{ $index }">
                            <el-button type="danger" size="default" icon="Delete" @click="deleteSaleAttr($index)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-form-item>
            <el-form-item label="">
                <el-button type="default" size="default" @click="returnMain">取消</el-button>
                <el-button type="primary" size="default" @click="save">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup lang="ts">
import { reqAddOrUpdateSpu, reqAllTradmark, reqBaseSaleAttrList, reqSpuImageList, reqSpuSaleAttrList } from '@/api/product/spu';
import type { AllTrademarkResponse, BaseSaleAttrList, BaseSaleAttrListResponse, SaleAttr, SaleAttrList, SaleAttrValue, Spu, SpuImageListResponse, SpuSaleAttrListResponse } from '@/api/product/spu/type';
import type { TrademarkList } from '@/api/product/trademark/type';
import { computed, nextTick, ref } from 'vue';
import useCategoryStore from '@/store/moudules/category';
import { ElMessage } from 'element-plus';
import useUserStore from '@/store/moudules/user'

const userStore = useUserStore()
const categoryStore = useCategoryStore();

const props = defineProps<{
  scene: number;
}>();
const emit = defineEmits<{
  'update:scene': [value: number]
}>()
const scene = computed({
  get: () => {
    return props.scene
  },
  set: (val) => {
    emit('update:scene', val)
  }
})
const headers = {Token: userStore.token}
const trademarkList = ref<TrademarkList>([]);
const saleAttrList = ref<SaleAttrList>([]);
const baseSaleAttrList = ref<BaseSaleAttrList>([]);
const dialogVisible = ref<boolean>(false);
const dialogImageUrl = ref<string>('');
const selectedSaleAttrId = ref<number>()
const inputRefs = ref<any>([]);
const editingMap = ref<Record<number, boolean>>({});
const inputValue = ref<string[]>([]);
const spuParams = ref<Spu>({
    spuName: '',
    description: '',
    category3Id: categoryStore.c3Id as number,
    spuSaleAttrList: [],
    spuImageList: null,
})

const returnMain = () => {
    saleAttrList.value = [];
    fileList4Upload.value = [];
    scene.value = 0;
}
const fileList4Upload = ref<any>([]);

const unSelectSaleAttr = computed(() => {
    return baseSaleAttrList.value.filter(bsa => {
        return saleAttrList.value.every(sa => {
            return bsa.name !== sa.saleAttrName
        })
    })
});

const handleSuccess = (response: any, uploadFile: any) => {
    console.log("upload success")
    uploadFile.url = response.data
}

const handlePictureCardPreview = (file: any) => {
    dialogVisible.value = true;
    dialogImageUrl.value = file.url;
}

const handleRemove = () => {

}

const addSaleAttr = () => {
    const baseSaleAttrMap = new Map(baseSaleAttrList.value.map(item => [item.id, item.name]));
    if(!selectedSaleAttrId.value) return;
    saleAttrList.value.push({
        spuId: spuParams.value.id,
        baseSaleAttrId: selectedSaleAttrId.value,
        saleAttrName: baseSaleAttrMap.get(selectedSaleAttrId.value) ?? '',
        spuSaleAttrValueList: []
    })
    selectedSaleAttrId.value = undefined;
}

const handleTagClose = (row: SaleAttr, item: SaleAttrValue) => {
  row.spuSaleAttrValueList.splice(row.spuSaleAttrValueList.indexOf(item), 1)
}

const showTagInput = ($index: number) => {
  editingMap.value[$index] = true
  inputValue.value[$index] = ''
  nextTick(() => {
    inputRefs.value[$index].input.focus()
  })
}

const handleTagInputConfirm = (row: SaleAttr, $index: number) => {
    if(inputValue.value[$index].trim() === '') {
        editingMap.value[$index] = false
        ElMessage.error("属性值不能为空")
        return
    }
    const repeated = row.spuSaleAttrValueList.find((item) => {
        return item.saleAttrValueName === inputValue.value[$index]
    })
    if(repeated) {
        editingMap.value[$index] = false
        ElMessage.error("属性值不能重复")
        return
    }
    row.spuSaleAttrValueList.push({
        baseSaleAttrId: row.baseSaleAttrId,
        saleAttrValueName: inputValue.value[$index]
    })
    editingMap.value[$index] = false
}

const deleteSaleAttr = ($index: number) => {
    saleAttrList.value.splice($index, 1);
}

const save = async () => {
    spuParams.value.spuImageList = fileList4Upload.value.map((img: any) => ({
        id: img.id,
        spuId: img.spuId,
        imgName: img.name,
        imgUrl: img.url,
    }));
    spuParams.value.spuSaleAttrList = saleAttrList.value;
    const result = await reqAddOrUpdateSpu(spuParams.value)
    if(result.code !== 200){
        ElMessage.error(spuParams.value.id?'修改SPU失败':'添加SPU失败')
        return
    }
    saleAttrList.value = [];
    fileList4Upload.value = [];
    ElMessage.success(spuParams.value.id?'修改SPU成功':'添加SPU成功')
    scene.value = 0;
}

const initSpuDate = async (spu: Spu) => {
    spuParams.value = spu;
    const tmRes: AllTrademarkResponse = await reqAllTradmark();
    const bsaRes: BaseSaleAttrListResponse = await reqBaseSaleAttrList();
    if (tmRes.code !== 200 || bsaRes.code !== 200) {
        //todo
        return;
    }
    baseSaleAttrList.value = bsaRes.data;
    trademarkList.value = tmRes.data;
    if(spu.id === undefined) return
    const imgRes: SpuImageListResponse = await reqSpuImageList(spu.id);
    const saRes: SpuSaleAttrListResponse = await reqSpuSaleAttrList(spu.id);
    if (imgRes.code !== 200 || saRes.code !== 200) {
        //todo
        return;
    }
    saleAttrList.value = saRes.data;
    fileList4Upload.value = imgRes.data.map(img => ({
        id: img.id,
        spuId: img.spuId,
        name: img.imgName,
        url: img.imgUrl,
    }))
}

defineExpose({ initSpuDate })
</script>

<style lang="scss" scoped>

</style>