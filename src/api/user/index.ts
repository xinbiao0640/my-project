//统一管理用户相关接口
import request from "@/utils/request";
import type { LoginData, LoginResponse, UserInfoResponse } from "./type";

//获取用户列表
/* 启用 “erasableSyntaxOnly” 时，不允许使用此语法。
enum API{
    LOGIN_URL = "/user/login",
    USER_INFO_URL = "/user/info",
}
*/
export const API = {
  LOGIN_URL: '/admin/acl/index/login',
  USER_INFO_URL: '/admin/acl/index/info',
  LOGOUT_URL: '/admin/acl/index/logout',
} as const;


export const reqLogin = (data: LoginData) => {
    return request.post<any, LoginResponse>(API.LOGIN_URL, data);
}
export const getUserInfo = () => {
    return request.get<any, UserInfoResponse>(API.USER_INFO_URL);
}
export const reqLogout = () => {
    return request.post<any, any>(API.LOGOUT_URL);
}
