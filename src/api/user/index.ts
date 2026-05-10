//统一管理用户相关接口
import request from "@/utils/request";
import type { LoginData, LoginResponse, userResponseData } from "./type";

//获取用户列表
/* 启用 “erasableSyntaxOnly” 时，不允许使用此语法。
enum API{
    LOGIN_URL = "/user/login",
    USER_INFO_URL = "/user/info",
}
*/
export const API = {
  LOGIN_URL: '/user/login',
  USER_INFO_URL: '/user/info',
} as const;


export const reqLogin = (data: LoginData) => {
    return request.post<LoginData, LoginResponse>(API.LOGIN_URL, data);
}
export const getUserInfo = () => {
    return request.get<userResponseData>(API.USER_INFO_URL);
}
