import request from "@/utils/request";
import type { TrademarkResponse } from "./type";

export const API = {
  TRADEMARK_URL: '/admin/product/baseTrademark/',
} as const;


export const reqTrademark = (page: number, limit: number) => {
    return request.get<any, TrademarkResponse>(API.TRADEMARK_URL + `${page}/${limit}`);
}
