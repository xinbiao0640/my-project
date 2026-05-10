import { createApp } from 'vue'
import App from '@/App.vue'
//引入组件库与样式
import ElementPlus from 'element-plus'
import "element-plus/dist/index.css";
import zhCn from 'element-plus/es/locale/lang/zh-cn'
//引入svg虚拟模块 
//@ts-ignore
import 'virtual:svg-icons-register'

//创建应用实例
const app = createApp(App)

//安装ui组件库
app.use(ElementPlus, {
  locale: zhCn,
})

//安装自定义插件
import globalComponent from "@/components";
app.use(globalComponent)

//引入全局样式
import '@/styles/index.scss'

app.mount('#app')
