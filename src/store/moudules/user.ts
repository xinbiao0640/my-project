//用户相关仓库
import { defineStore } from 'pinia';
import type { LoginData } from '@/api/user/type';
import { reqLogin } from '@/api/user';
import { ref } from 'vue';
import { getToken, setToken } from '@/utils/token';

const useUserStore = defineStore('user', () => {
    let token = ref( getToken() );

    async function login( data: LoginData ) {
        let result = await reqLogin(data)
        console.log(result);
        if(result.code === 200) {
            token.value = (result.data.token) as string;
            setToken(token.value);
            return 'ok';
        } else {
            return Promise.reject(new Error(result.data.message));
        }
    }

    return{ login, token }
})

export default useUserStore;