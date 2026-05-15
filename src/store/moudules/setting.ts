//用户相关仓库
import { defineStore } from 'pinia';
import { ref } from 'vue';

const useLayoutSettingStore = defineStore('setting', () => {
    let isFolded = ref(false)
    let needRefresh = ref(false)

    return{ isFolded, needRefresh }
})

export default useLayoutSettingStore;