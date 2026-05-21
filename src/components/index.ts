import Category from '@/components/Category/index.vue';
import SvgIcon from '@/components/SvgIcon/index.vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import type { App, Component} from 'vue'

const allGlobalComponent: Record<string, Component> = { SvgIcon, Category }
//对外暴露插件对象
export default {
    install(app:App){
        Object.keys(allGlobalComponent).forEach(key =>{
            app.component(key, allGlobalComponent[key]);
        })
        //注册element-plus图标组件
        for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
            app.component(key, component)
        }
    }
}