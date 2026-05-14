<template>
  <div class="logo">
    <img src="@/assets/logo.svg" alt="Logo"/>
    <p :class="{ 'text-show': !isFolded }">Project Name</p>
  </div>
</template>

<script setup lang="ts">
defineProps({
    isFolded: {
    type: Boolean,
    default: false
  }
});
</script>

<style lang="scss" scoped>
.logo {
  width: fit-content;
  height: 50px;
  display: flex;
  align-items: center;
  margin: 0 auto;
  //padding: 20px;
  img{
    width: 40px;
    height: 40px;
  }
  p{
    margin-left: 0px;
    font-size: 0px;
    color: #ffffff;
    transition: all 0.3s;
    &.text-show {
      font-size: 24px;
      //max-width: 200px;
      opacity: 1;
      margin-left: 10px;
    }
  }
}
</style>