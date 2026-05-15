//进行axios二次封装：使用请求与响应拦截器
import axios from "axios";
import { ElMessage } from "element-plus"
import useUserStore from "@/store/moudules/user";

//创建axios实例
let request = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_API,
    timeout: 5000, //超时时间
});
request.interceptors.request.use((config) => {
    const userStore = useUserStore()
    if(userStore.token) {
        config.headers.token = userStore.token
    }
    return config;
})
request.interceptors.response.use((response) => {
    //成功回调，简化数据
    return response.data;
}, (error) => {
    //失败回调
    let message = '';
    let status = error.response.status;
    switch (status){
        case 401:
            message = "TOKEN 过期"
            break;
        case 403:
            message = "无权访问"
            break;
        case 404:
            message = "请求地址错误"
            break;
        case 500:
            message = "服务器出现问题"
            break;
        default:
            message = "网络出现问题"
            break;
    }

    ElMessage({
        type: 'error',
        message
    });

    return Promise.reject(error);
});

export default request;