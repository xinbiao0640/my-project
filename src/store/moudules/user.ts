//用户相关仓库
import { defineStore } from 'pinia';
import type { LoginData } from '@/api/user/type';
import { reqLogin, getUserInfo } from '@/api/user';
import { ref } from 'vue';
import { getToken, setToken, removeToken } from '@/utils/token';
import { routes } from '@/router/routers';

const useUserStore = defineStore('user', () => {
    let token = ref( getToken() );
    let username = ref('')
    let avatar = ref('')
    const menuRoutes = ref(routes);
    
    async function login( data: LoginData ) {
        let result = await reqLogin(data)
        if(result.code === 200) {
            token.value = (result.data.token) as string;
            setToken(token.value);
            await userInfo();
            return 'ok';
        } else {
            return Promise.reject(new Error(result.data.message));
        }
    }
    async function userInfo() {
        let result = await getUserInfo()
        if(result.code === 200) {
            username.value = result.data.checkUser.username;
            avatar.value = result.data.checkUser.avatar;
            return 'ok'
        } else {
            return Promise.reject(new Error("获取用户信息失败"));
        }
    }
    function logout() {
        token.value = '';
        username.value = '';
        avatar.value = '';
        removeToken();   
    }


    return{ login, userInfo, logout, token, username, avatar, menuRoutes }
})

export default useUserStore;