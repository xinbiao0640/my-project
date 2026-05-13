<template>
  <div class="logo">
    <img src="@/assets/logo.svg" alt="Logo"/>
    <p>Project Name</p>
  </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
.logo {
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  padding: 20px;
  img{
    width: 40px;
    height: 40px;
  }
  p{
    margin-left: 10px;
    font-size: 24px;
    color: #ffffff;
  }
}
</style>