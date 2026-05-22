import request from "@/utils/request";
import type { SpuResponse } from "./type";

export const API = {
  GETSPU_URL: '/admin/product/getCategory1',

} as const;

export const reqSpu = (page: number, limit: number, category3Id: number) => {
  return request.get<any, SpuResponse>(API.GETSPU_URL + `${page}/${limit}?category3Id=${category3Id}`);
}