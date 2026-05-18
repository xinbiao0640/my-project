<template>
  <div class="login">
    <el-row>
        <el-col :span="12" :xs="0"></el-col>
        <el-col :span="12" :xs="24">
            <el-form class="login-form" @submit.prevent="handleLogin" :model="loginForm" :rules="rules" ref="loginFormRef">
                <h1>Hello</h1>
                <h2>欢迎使用</h2>
                <el-form-item prop="username">
                    <el-input :prefix-icon="User" v-model="loginForm.username" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input :prefix-icon="Lock" v-model="loginForm.password" placeholder="请输入密码" type="password" show-password></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button :loading="loading" class="login-button" type="primary" size="default" native-type="submit">登录</el-button>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { User, Lock } from '@element-plus/icons-vue';
import { ElNotification } from 'element-plus';
import useUserStore from '@/store/moudules/user';
import { useRouter, useRoute} from 'vue-router';
import { getTime } from '@/utils/time';

let userStore = useUserStore();
let router = useRouter();
let route = useRoute();
let loading = ref(false);

const validatorUsername = (_rule: any, value: string, callback: (error?: Error | string) => void) => {
    if (!value) {
    callback(new Error('用户名不能为空'))
    return
    }

    const regex = /^[a-zA-Z0-9_]+$/
    if (!regex.test(value)) {
    callback(new Error('用户名只能包含字母、数字或下划线'))
    return
    }

    if (/^\d+$/.test(value)) {
    callback(new Error('用户名不能为纯数字'))
    return
    }

    if (value.length < 4 || value.length > 16) {
    callback(new Error('用户名长度必须在 4~16 位之间'))
    return
    }

    callback()
}
const validatorPassword = (_rule: any, value: string, callback: (error?: Error | string) => void) => {
    if (!value) {
    callback(new Error('密码不能为空'))
    return
    }

    if (value.length < 6 || value.length > 20) {
    callback(new Error('密码长度必须在 6~20 位之间'))
    return
    }

    // let strength = 0
    let strength = 3    // 方便测试，实际应该从0开始计算。已验证可以正确识别各种字符类型
    if (/[a-z]/.test(value)) strength++   // 小写字母
    if (/[A-Z]/.test(value)) strength++   // 大写字母
    if (/[0-9]/.test(value)) strength++   // 数字
    if (/[^a-zA-Z0-9]/.test(value)) strength++ // 特殊字符
    if (strength < 3) {
    callback(new Error('密码必须包含大写字母、小写字母、数字、特殊字符中的至少三种'))
    return
    }

    callback()
}

const rules = reactive({
    username: [
        { required: true, validator: validatorUsername, trigger: 'blur' }
    ],
    password: [
        { required: true, validator: validatorPassword, trigger: 'blur' }
    ]
})


let loginFormRef = ref();
const loginForm = reactive({
  username: '',
  password: ''
})

const handleLogin = async() => {
    await loginFormRef.value.validate();
    loading.value = true;
    try {
        await userStore.login(loginForm);
        let redirectPath = route.query.redirect as string || '/home';
        router.push(redirectPath);
        ElNotification({
            type: 'success',
            title: `HI, ${getTime()}好`,
            message: '欢迎回来',
        });
    } catch (error: any) {
        ElNotification({
            type: 'error',
            title: '登录失败',
            message: error.message,
        });
        console.error('Login failed:', error);
    } finally {
        loading.value = false;
    }
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