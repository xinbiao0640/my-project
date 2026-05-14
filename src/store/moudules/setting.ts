//用户相关仓库
import { defineStore } from 'pinia';
import { ref } from 'vue';

const useLayoutSettingStore = defineStore('setting', () => {
    let isFolded = ref(false)

    return{ isFolded }
})

export default useLayoutSettingStore;