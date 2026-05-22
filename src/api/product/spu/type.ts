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
    tmId: number;
    spuSaleAttrList: null; // mark
    spuImageList: null; // mark
}

export type SpuList = Spu[];

export interface SpuResponse extends ResponseData {
    data: {
        records: Spu[];
        total: number;
        size: number;
        current: number;
        searchCount: boolean;
        pages: number;
    };
}