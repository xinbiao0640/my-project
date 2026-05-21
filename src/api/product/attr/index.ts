import request from "@/utils/request";
import type { CategoryResponse, AttrResponse, Attr } from "./type";

export const API = {
  GETCATEGORY1_URL: '/admin/product/getCategory1',
  GETCATEGORY2_URL: '/admin/product/getCategory2/',
  GETCATEGORY3_URL: '/admin/product/getCategory3/',
  GETATTR_URL: '/admin/product/attrInfoList/',
  ADDORUPDATEATTR_URL: '/admin/product/saveAttrInfo',
  DELETEATTR_URL: '/admin/product/deleteAttr/'
} as const;


export const reqCategory1 = () => {
  return request.get<any, CategoryResponse>(API.GETCATEGORY1_URL);
}
export const reqCategory2 = (category1Id: number) => {
  return request.get<any, CategoryResponse>(API.GETCATEGORY2_URL + category1Id);
}
export const reqCategory3 = (category2Id: number) => {
  return request.get<any, CategoryResponse>(API.GETCATEGORY3_URL + category2Id);
}
export const reqAttr = (category1Id: number, category2Id: number, category3Id: number) => {
  return request.get<any, AttrResponse>(API.GETATTR_URL + `${category1Id}/${category2Id}/${category3Id}`);
}
export const reqAddOrUpdateAttr = (data: Attr) => {
  return request.post<Attr, any>(API.ADDORUPDATEATTR_URL, data);
}
export const reqDeleteAttr = (attrId: number) => {
  return request.delete<any, any>(API.DELETEATTR_URL + attrId);
}