<template>
    <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
            <component :is="Component" :key="refreshKey"></component>
        </transition>
    </router-view>
</template>

<script setup lang="ts">
import { watch, ref } from 'vue';
import useLayoutSettingStore from '@/store/moudules/setting';

const settingStore = useLayoutSettingStore();

let refreshKey = ref(0)
watch(()=>settingStore.needRefresh, (need) => {
    if(!need) return
    refreshKey.value ++;
    settingStore.needRefresh = false;
})
</script>

<style lang="scss" scoped>
.fade-enter-from {
    opacity: 0;
    transform: scale(0);
}
.fade-enter-active {
    transition: all 0.3s;
}
.fade-enter-to {
    opacity: 1;
    transform: scale(1);
}
</style>