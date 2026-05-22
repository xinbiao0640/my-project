<template>
    <div>
        <el-form label-width="100px">
            <el-form-item label="SPU名称">
                <el-input placeholder="请输入SPU名称" style=""></el-input>
            </el-form-item>
            <el-form-item label="SPU品牌">
                <el-select style="width: 250px;">
                    <el-option label="label 1" :value="1"></el-option>
                    <el-option label="label 2" :value="2"></el-option>
                    <el-option label="label 3" :value="3"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="SPU名称">
                <el-input placeholder="请输入描述" type="textarea" style=""></el-input>
            </el-form-item>
            <el-form-item label="SPU图片">
                <el-upload v-model:file-list="fileList"
                    action="-" list-type="picture-card"
                    :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
                    <el-icon>
                        <Plus />
                    </el-icon>
                </el-upload>
            </el-form-item>
            <el-form-item label="SPU销售属性">
                <el-select style="width: 250px; margin-right: 10px;">
                    <el-option label="label 1" :value="1"></el-option>
                    <el-option label="label 2" :value="2"></el-option>
                    <el-option label="label 3" :value="3"></el-option>
                </el-select>
                <el-button type="primary" size="default" icon="Plus">添加销售属性</el-button>
                <el-table border style="margin: 10px 0px;">
                    <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
                    <el-table-column label="属性名" align="center" width="160px"></el-table-column>
                    <el-table-column label="属性值" align="center"></el-table-column>
                    <el-table-column label="操作" align="center" width="240px"></el-table-column>
                </el-table>
            </el-form-item>
            <el-form-item label="">
                <el-button type="default" size="default" @click="returnMain">取消</el-button>
                <el-button type="primary" size="default">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

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

const returnMain = () => {
    scene.value = 0;
}

const fileList = ref([]);

const handlePictureCardPreview = () => {

}

const handleRemove = () => {

}
</script>

<style lang="scss" scoped>

</style>