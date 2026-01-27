# tk-ruoyi-frontend

通科管理系统前端项目，基于 Vue 3 + Vite + Element Plus 构建，采用 Pinia 管理状态、Vue Router 路由管理。

## 技术栈

- Vue 3
- Vite 5
- Element Plus
- Pinia
- Vue Router
- Axios
- ECharts
- Tailwind CSS
- Sass

## 目录结构

```
.
├─ src/                     # 主应用源码
│  ├─ api/                   # API 客户端
│  ├─ assets/                # 静态资源与全局样式
│  ├─ components/            # 通用组件
│  ├─ router/                # 路由
│  ├─ store/                 # Pinia store
│  ├─ utils/                 # 工具方法
│  └─ views/                 # 页面模块（system / tk_custom）
├─ public/                   # 构建时原样拷贝静态资源
├─ vite/                     # Vite 插件配置
├─ vite.config.js            # Vite 配置（别名/代理/构建）
└─ tailwind.config.js        # Tailwind 配置
```

## 开发环境

- Node.js 18+（建议）
- npm 或 pnpm

## 安装依赖

```
npm install
```

## 本地开发

```
npm run dev
```

默认地址：`http://localhost:80`

## 构建

```
# 生产构建
npm run build:prod

# 预发布构建
npm run build:stage
```

## 预览构建产物

```
npm run preview
```

## 代理配置

开发环境默认将 `/dev-api` 代理到 `http://127.0.0.1:8180`，并自动重写去除 `/dev-api` 前缀。
如需修改，编辑 `vite.config.js`。

## 代码风格

- JS/Vue/SCSS 统一 2 空格缩进
- 组件文件使用 PascalCase 命名
- 路由路径使用 kebab-case
- JS 优先使用单引号（跟随当前文件约定）

## 说明

- 当前项目未配置测试脚本
- 如需新增测试框架，请同步补充 `package.json` 脚本及本文档

## License

MIT
