import SvgIcon from '@/components/SvgIcon/index.vue'
import type { App, Component} from 'vue'

const allGlobalComponent: Record<string, Component> = { SvgIcon }
//对外暴露插件对象
export default {
    install(app:App){
        Object.keys(allGlobalComponent).forEach(key =>{
            app.component(key, allGlobalComponent[key]);
        })
    }
}