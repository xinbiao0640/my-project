import type { TrademarkList } from "../trademark/type";

export interface ResponseData {
    code: number;
    message: string;
    ok: boolean;
}

export interface Spu {
    id?: number;
    spuName: string;
    description: string;
    category3Id: number;
    tmId?: number;
    spuSaleAttrList: SaleAttrList | null;
    spuImageList: SpuImageList | null;
}

export type SpuList = Spu[];

export interface SpuResponse extends ResponseData {
    data: {
        records: SpuList;
        total: number;
        size: number;
        current: number;
        searchCount: boolean;
        pages: number;
    };
}

export interface AllTrademarkResponse extends ResponseData {
    data: TrademarkList;
}

export interface SpuImage {
    id?: number;
    createTime?: string;
    updateTime?: string;
    spuId?: number;
    imgName: string;
    imgUrl: string;
}

export type SpuImageList = SpuImage[];

export interface SpuImageListResponse extends ResponseData {
    data: SpuImageList;
}

export interface SaleAttrValue {
    id?: number;
    createTime?: null;
    updateTime?: null;
    spuId?: number;
    baseSaleAttrId: number;
    saleAttrValueName: string;
    saleAttrName?: string;
    isCheck?: null;
}

export type SaleAttrValueList = SaleAttrValue[];

export interface SaleAttr {
    id?: number;
    createTime?: null;
    updateTime?: null;
    spuId?: number;
    baseSaleAttrId: number;
    saleAttrName: string;
    spuSaleAttrValueList: SaleAttrValueList;
}

export type SaleAttrList = SaleAttr[];

export interface SpuSaleAttrListResponse extends ResponseData {
    data: SaleAttrList;
}

export interface BaseSaleAttr {
    id: number;
    name: string;
}

export type BaseSaleAttrList = BaseSaleAttr[];

export interface BaseSaleAttrListResponse extends ResponseData {
    data: BaseSaleAttrList;
}