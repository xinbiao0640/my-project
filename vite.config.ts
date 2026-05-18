import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
//svg相关插件
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
//mock
import { viteMockServe } from 'vite-plugin-mock'

// https://vite.dev/config/
export default defineConfig(({ command, mode })=>{
  let env = loadEnv(mode, process.cwd());
  return{
    plugins: [
      vue(),
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        symbolId: 'icon-[dir]-[name]',
      }),
      viteMockServe({
        mockPath: 'mock',          // mock 文件存放目录（相对于项目根）
        enable: command === 'serve',        // 开发环境是否启用
        // 可选：如果需要在控制台打印请求日志
        logger: true,
      }),
    ],
    resolve: {
      alias: {
        "@": path.resolve("./src")
      }
    },
    //scss全局变量配置
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/styles/variable.scss" as *;`
        }
      }
    },
    server: {
      proxy: {
        [env.VITE_APP_BASE_API]: {
          target: env.VITE_SERVE,
          changeOrigin: false,
          rewrite: (path) => path.replace(new RegExp(`^${env.VITE_APP_BASE_API}`), '')
        }
      }
    }
  }
})
