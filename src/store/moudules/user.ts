//用户相关仓库
import { defineStore } from 'pinia';
import type { LoginData, LoginResponse, UserInfoResponse } from '@/api/user/type';
import { reqLogin, getUserInfo, reqLogout } from '@/api/user';
import { ref } from 'vue';
import { getToken, setToken, removeToken } from '@/utils/token';
import { routes } from '@/router/routers';

const useUserStore = defineStore('user', () => {
    let token = ref( getToken() );
    let username = ref('')
    let avatar = ref('')
    const menuRoutes = ref(routes);
    
    async function login( data: LoginData ) {
        let result: LoginResponse = await reqLogin(data)
        if(result.code === 200) {
            token.value = (result.data) as string;
            setToken(token.value);
            await userInfo();
            return 'ok';
        } else {
            return Promise.reject(new Error(result.message));
        }
    }
    async function userInfo() {
        let result: UserInfoResponse = await getUserInfo()
        if(result.code === 200) {
            username.value = result.data.name;
            avatar.value = result.data.avatar;
            return 'ok'
        } else {
            return Promise.reject(new Error(result.message));
        }
    }
    async function logout() {
        let result: any = await reqLogout();
        if(result.code === 200) {
            token.value = '';
            username.value = '';
            avatar.value = '';
            removeToken(); 
            return 'ok'
        } else {
            return Promise.reject(new Error(result.message));
        }
  
    }


    return{ login, userInfo, logout, token, username, avatar, menuRoutes }
})

export default useUserStore;