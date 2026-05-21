//分类相关仓库
import { defineStore } from 'pinia';
import { reqCategory1, reqCategory2, reqCategory3, reqAttr } from '@/api/product/attr';
import type { Category, CategoryResponse, Attr, AttrResponse } from "@/api/product/attr/type";
import { ref } from 'vue';

const useCategoryStore = defineStore('category', () => {
    const c1Arry = ref<Category[]>([])
    const c2Arry = ref<Category[]>([])
    const c3Arry = ref<Category[]>([])
    const attrArry = ref<Attr[]>([])
    const c1Id = ref<number>()
    const c2Id = ref<number>()
    const c3Id = ref<number>()
    async function getCategory1(){
        const result: CategoryResponse = await reqCategory1();
        if (result.code === 200) {
            c1Arry.value = result.data;
        } else {
            //todo
        }
        return;
    }
    async function getCategory2(){
        if(c1Id.value === undefined){
            return;
        }
        const result: CategoryResponse = await reqCategory2(c1Id.value);
        if (result.code === 200) {
            c2Arry.value = result.data;
        } else {
            //todo
        }
        return;
    }
    async function getCategory3(){
        if(c2Id.value === undefined){
            return;
        }
        const result: CategoryResponse = await reqCategory3(c2Id.value);
        if (result.code === 200) {
            c3Arry.value = result.data;
        } else {
            //todo
        }
        return;
    }
    async function getAttr(){
        attrArry.value = []
        if(c1Id.value === undefined || c2Id.value === undefined || c3Id.value === undefined){
            return;
        }
        const result: AttrResponse = await reqAttr(c1Id.value, c2Id.value, c3Id.value);
        if (result.code === 200) {
            attrArry.value = result.data;
        } else {
            //todo
        }
    }
    function $reset(){
        c1Arry.value = [];
        c2Arry.value = [];
        c3Arry.value = [];
        attrArry.value = [];
        c1Id.value = undefined;
        c2Id.value = undefined;
        c3Id.value = undefined;
    }

    return{ c1Arry, c2Arry, c3Arry, attrArry, c1Id, c2Id, c3Id, getCategory1, getCategory2, getCategory3, getAttr, $reset }
})

export default useCategoryStore;