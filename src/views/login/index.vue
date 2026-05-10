<template>
  <div class="login">
    <el-row>
        <el-col :span="12" :xs="0"></el-col>
        <el-col :span="12" :xs="24">
            <el-form class="login-form" @submit.prevent="handleLogin">
                <h1>Hello</h1>
                <h2>欢迎使用</h2>
                <el-form-item>
                    <el-input :prefix-icon="User" v-model="loginForm.username" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input :prefix-icon="Lock" v-model="loginForm.password" placeholder="请输入密码" type="password" show-password></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button class="login-button" type="primary" size="default" native-type="submit">登录</el-button>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { User, Lock } from '@element-plus/icons-vue';

const loginForm = ref({
  username: '',
  password: ''
})

const handleLogin = () => {
  // Handle login logic here
  console.log('handleLogin');
}

</script>

<style lang="scss" scoped>
.login {
    width: 100%;
    height: 100vh;
    background: url('@/assets/images/background.jpg') no-repeat center center;
    background-size: cover;
}
.login-form {
    position: relative;
    width: 80%;
    top: 30vh;
    padding: 30px;
    background: url('@/assets/images/login_form.png') no-repeat center center;
    background-size: cover;
}
h1 {
    font-size: 36px;
    color: #fff;
}
h2 {
    font-size: 24px;
    color: #fff;
    margin: 20px 0px;
}
.login-button {
    width: 100%;
}
</style>