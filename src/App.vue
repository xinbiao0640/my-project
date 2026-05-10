<template>
  <div class="app-container">
    <h1>🚀 Vue3 + Vite 开发模板</h1>
    <p class="subtitle">
      开箱即用的前端工程化基础，后续新项目可直接基于此模板起步。
    </p>
    <section>
      <h2>✅ 已集成特性</h2>
      <br>
      <div class="feature-list">
        <el-tag
          v-for="(feat, idx) in features"
          :key="idx"
          type="success"
          effect="plain"
        >
          {{ feat }}
        </el-tag>
      </div>
    </section>
    <p class="tips">
      此页面为ai生成，仅供测试和展示使用，内容可能不准确或不完整
    </p>
  </div>
</template>

<script setup lang="ts">
const features = [
  'Vue 3 + TypeScript',
  'Vite 构建',
  'Element Plus UI 库（已配置中文）',
  '路径别名 @ → src',
  '环境变量（.env.development / .production / .test）',
  'Sass 预处理器 + 全局变量（src/styles/variable.scss）',
  'reset.scss 默认样式清除',
  'SVG 雪碧图组件（SvgIcon）',
  'Mock 数据服务（vite-plugin-mock）',
  'Axios 二次封装（请求/响应拦截器）',
  'API 接口统一管理（src/api）',
  '全局组件注册（插件方式）',
]
</script>

<style lang="scss" scoped>
.app-container {
  max-width: 720px;
  margin: 60px auto;
  padding: 0 20px;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
}

h1 {
  text-align: center;
  margin-bottom: 8px;
}

.subtitle {
  text-align: center;
  color: #666;
  margin-bottom: 40px;
}

.feature-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
}
.tips {
  margin-top: 60px;
  text-align: center;
  color: #999;
  font-size: 14px;
}
</style>