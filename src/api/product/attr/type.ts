export interface ResponseData {
    code: number;
    message: string;
    ok: boolean;
}

export interface Category {
    id: number | undefined;
    name: string;
    Category1id?: number;
    Category2id?: number;
}

export type CategoryList = Category[];

export interface CategoryResponse extends ResponseData {
    data: CategoryList;
}

export interface AttrValue {
    id?: number;
    valueName: string;
    attrId?: number;
}

export type AttrValueList = AttrValue[];

export interface Attr {
    id?: number;
    attrName: string;
    categoryId: number|undefined;
    categoryLevel: number;
    attrValueList: AttrValueList
}

export type AttrList = Attr[];

export interface AttrResponse extends ResponseData {
    data: AttrList;
}