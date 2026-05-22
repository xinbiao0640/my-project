<template>
  <el-pagination 
    v-model:current-page="currentPage"
    v-model:page-size="pageSize"
    :page-sizes="pageSizes"
    size="default"
    :disabled="false"
    :background="true"
    layout="prev, pager, next, jumper, ->, sizes, total"
    :total="total" />
</template>

<script setup lang="ts">
import { computed } from 'vue';

const DEFAULT_PAGESIZES = [3, 5, 7, 9];


interface PaginationModel {
  pageNo: number
  limit: number
  total: number
  pageSizes?: number[]
}
const props = defineProps<{
  modelValue?: PaginationModel        // v-model 对象模式
  pageNo?: number                     // v-model:pageNo 分离模式
  limit?: number                      // v-model:limit 分离模式
  total?: number                      // 单独的 total prop（两种模式都可能用）
  pageSizes?: number[]
}>()

const emit = defineEmits<{
  'update:modelValue': [value: PaginationModel]
  'update:pageNo': [value: number]
  'update:limit': [value: number]
}>()

// 如果父组件传了 pageNo prop（即使用了 v-model:pageNo），就用分离模式
const isSeparateMode = computed(() => props.pageNo !== undefined)

// 当前页码
const currentPage = computed({
  get: () => {
    if (isSeparateMode.value) return props.pageNo ?? 1
    return props.modelValue?.pageNo ?? 1
  },
  set: (val) => {
    if (isSeparateMode.value) {
      emit('update:pageNo', val)
    } else {
      emit('update:modelValue', { ...props.modelValue!, pageNo: val } as PaginationModel)
    }
  }
})

// 每页条数
const pageSize = computed({
  get: () => {
    if (isSeparateMode.value) return props.limit ?? DEFAULT_PAGESIZES[0]
    return props.modelValue?.limit ?? DEFAULT_PAGESIZES[0]
  },
  set: (val) => {
    if (isSeparateMode.value) {
      emit('update:limit', val)
    } else {
      emit('update:modelValue', { ...props.modelValue!, limit: val } as PaginationModel)
    }
  }
})

// 总条数：优先使用直接传入的 :total，否则从对象中取
const total = computed(() => props.total ?? props.modelValue?.total ?? 0)

// 页大小选项
const pageSizes = computed(() => {
  if (props.pageSizes) return props.pageSizes
  return props.modelValue?.pageSizes ?? DEFAULT_PAGESIZES
})
</script>

<style lang="scss" scoped>

</style>