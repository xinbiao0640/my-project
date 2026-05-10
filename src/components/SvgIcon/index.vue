<template>
  <svg :style="iconStyle" aria-hidden="true">
    <use :href="symbolId" :fill="props.color" />
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  // 图标文件名
  name: { type: String, required: true },
  // 图标颜色
  color: { type: String, default: '#333' },
  // 图标大小
  size: { type: String, default: undefined },
  width: { type: String, default: undefined },
  height: { type: String, default: undefined }
});

const symbolId = computed(() => `#icon-${props.name}`);
const iconStyle = computed(() => {
  // 如果传了 size，则宽高都等于 size
  if (props.size) {
    return { width: props.size, height: props.size }
  }
  else if (props.width && props.height) {
    return { width: props.width, height: props.height }
  }
  else if (props.height) {
    return { width: props.height, height: props.height }
  }
  else if (props.width) {
    return { width: props.width, height: props.width }
  }else {
    return { width: '16px', height: '16px' }
  }
})
</script>