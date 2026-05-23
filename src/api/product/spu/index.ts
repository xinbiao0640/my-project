import request from "@/utils/request";
import type { AllTrademarkResponse, BaseSaleAttrListResponse, Spu, SpuImageListResponse, SpuResponse, SpuSaleAttrListResponse } from "./type";

export const API = {
  GETSPU_URL: '/admin/product/',
  GETALLTRADEMARK_URL: '/admin/product/baseTrademark/getTrademarkList',
  GETSPUIMAGELIST_URL: '/admin/product/spuImageList/',
  GETSPUSALEATTRLIST_URL: '/admin/product/spuSaleAttrList/',
  GETSASESALEATTRLIST_URL: 'admin/product/baseSaleAttrList',
  ADDSPU_URL: '/admin/product/saveSpuInfo',
  UPDATESPU_URL: '/admin/product/updateSpuInfo',
  DELETESPU_URL: '/admin/product/deleteSpu/',
} as const;

export const reqSpu = (page: number, limit: number, category3Id: number) => {
  return request.get<any, SpuResponse>(API.GETSPU_URL + `${page}/${limit}?category3Id=${category3Id}`);
}
export const reqAllTradmark = () => {
  return request.get<any, AllTrademarkResponse>(API.GETALLTRADEMARK_URL);
}
export const reqSpuImageList = (spuId: number) => {
  return request.get<any, SpuImageListResponse>(API.GETSPUIMAGELIST_URL + spuId);
}
export const reqSpuSaleAttrList = (spuId: number) => {
  return request.get<any, SpuSaleAttrListResponse>(API.GETSPUSALEATTRLIST_URL + spuId);
}
export const reqBaseSaleAttrList = () => {
  return request.get<any, BaseSaleAttrListResponse>(API.GETSASESALEATTRLIST_URL);
}
export const reqAddOrUpdateSpu = (data: Spu) => {
  return request.post<any, any>(data.id ? API.UPDATESPU_URL : API.ADDSPU_URL, data);
}
export const reqDeleteSpu = (spuId: number) => {
  return request.delete<any, any>(API.DELETESPU_URL + spuId);
}