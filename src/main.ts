import { createApp } from 'vue'
import App from '@/App.vue'
//引入全局样式
import '@/styles/index.scss'
//引入组件库与样式
import ElementPlus from 'element-plus'
import "element-plus/dist/index.css";
import zhCn from 'element-plus/es/locale/lang/zh-cn'
//引入svg虚拟模块 
//@ts-ignore
import 'virtual:svg-icons-register'
//引入路由
import router from '@/router'
//引入状态管理
import pinia from '@/store'

//创建应用实例
const app = createApp(App)

//安装路由
app.use(router)

//安装状态管理
app.use(pinia)

//安装ui组件库
app.use(ElementPlus, {
  locale: zhCn,
})

//安装自定义插件
import globalComponent from "@/components";
app.use(globalComponent)

app.mount('#app')
