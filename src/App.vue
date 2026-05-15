<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import useUserStore from '@/store/moudules/user';

const userStore = useUserStore();
onMounted( async ()=> {
  if(userStore.token && !userStore.username)
    await userStore.userInfo()
})
</script>

<style lang="scss" scoped>

</style>