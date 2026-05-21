import request from "@/utils/request";
import type { Trademark, TrademarkResponse } from "./type";

export const API = {
  TRADEMARK_URL: '/admin/product/baseTrademark/',
  ADDTRADEMARK_URL: '/admin/product/baseTrademark/save',
  UPDATETRADEMARK_URL: '/admin/product/baseTrademark/update',
  DELETETETRADEMARK_URL: '/admin/product/baseTrademark/remove/',
} as const;


export const reqTrademark = (page: number, limit: number) => {
  return request.get<any, TrademarkResponse>(API.TRADEMARK_URL + `${page}/${limit}`);
}
export const reqAddOrUpdateTrademark = (data: Trademark) => {
  if(data.id){
    return request.put<any, any>(API.UPDATETRADEMARK_URL, data);
  }
  return request.post<any, any>(API.ADDTRADEMARK_URL, data);
}
export const reqDeleteTrademark = (id: number) => {
  return request.delete<any, any>(API.DELETETETRADEMARK_URL + id);
}