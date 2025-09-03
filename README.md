# JSON在线格式化工具

<div align="center">

[![Next.js](https://img.shields.io/badge/Next.js-15.0-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

**专业的JSON在线处理工具，提供格式化、验证、压缩、转换等功能**

[在线体验](https://jsonviewer-phi.vercel.app) · [功能特性](#功能特性) · [快速开始](#快速开始) · [部署说明](#部署说明)

</div>

## ✨ 功能特性

### 🎯 核心功能
- **JSON格式化美化** - 将压缩的JSON数据格式化为易读的结构，支持自定义缩进
- **实时语法验证** - 实时检查JSON语法错误，精确定位错误位置，提供详细错误信息
- **语法高亮显示** - 不同数据类型使用不同颜色高亮显示（字符串、数字、布尔值、null值等）
- **数据统计分析** - 显示JSON数据的详细统计信息，包括对象数量、数组长度、数据类型分布等
- **一键复制功能** - 快速复制格式化后的JSON数据到剪贴板
- **示例数据展示** - 提供常见的JSON数据示例，便于学习和测试

### 🔧 工具页面
- **JSON验证器** - 专业的JSON语法验证工具，包含常见错误类型和修复方法
- **JSON压缩器** - 移除多余空格、换行和缩进，减小JSON文件体积
- **教程中心** - 完整的JSON学习路径，从基础到进阶

### 🚀 技术特性
- **服务端渲染** - 基于Next.js的SSR架构，SEO友好
- **响应式设计** - 完美支持桌面端和移动端
- **TypeScript** - 完整的类型安全支持
- **现代化UI** - 基于Tailwind CSS的美观界面
- **性能优化** - 静态生成，首屏加载快速

## 🚀 快速开始

### 环境要求

- Node.js 18.0 或更高版本
- npm 或 yarn 包管理器

### 本地开发

1. **克隆项目**
```bash
git clone https://github.com/onlythinking/jsonviewer.git
cd jsonviewer
```

2. **安装依赖**
```bash
npm install
# 或使用 yarn
yarn install
```

3. **启动开发服务器**
```bash
npm run dev
# 或使用 yarn
yarn dev
```

4. **访问应用**
打开浏览器访问 [http://localhost:3000](http://localhost:3000)

### 构建生产版本

```bash
npm run build
npm run start
```

## 📁 项目结构

```
jsonviewer/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx         # 全局布局
│   │   ├── page.tsx           # 主页面
│   │   ├── validator/         # 验证器页面
│   │   ├── minifier/          # 压缩器页面
│   │   ├── tutorials/         # 教程页面
│   │   └── sitemap.ts         # 站点地图
│   ├── components/            # React 组件
│   │   ├── JsonEditor.tsx     # JSON编辑器主组件
│   │   ├── Header.tsx         # 头部导航
│   │   └── Footer.tsx         # 底部信息
│   └── lib/                   # 工具函数
│       └── jsonUtils.ts       # JSON处理工具
├── public/                    # 静态资源
├── tailwind.config.ts         # Tailwind CSS配置
├── next.config.js            # Next.js配置
└── vercel.json               # Vercel部署配置
```

## 🎨 主要组件

### JsonEditor 组件
核心的JSON处理组件，提供以下功能：
- JSON输入和输出
- 实时验证和错误提示
- 语法高亮显示
- 统计信息展示
- 工具栏操作（格式化、压缩、清空、复制等）

### JSON工具函数
位于 `src/lib/jsonUtils.ts`，包含：
- `validateJson()` - JSON验证
- `formatJson()` - JSON格式化
- `compressJson()` - JSON压缩
- `analyzeJson()` - 数据统计分析
- `getExampleJson()` - 获取示例数据

## 🌐 部署说明

### Vercel 部署（推荐）

1. **推送代码到 GitHub**
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **连接 Vercel**
- 访问 [vercel.com](https://vercel.com)
- 点击 "New Project"
- 导入 GitHub 仓库
- 自动部署将开始

3. **自定义域名**（可选）
- 在 Vercel 项目设置中添加域名
- 配置 DNS 记录

### 其他部署方式

**Netlify**
```bash
npm run build
# 上传 .next 文件夹到 Netlify
```

**Docker 部署**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## ⚙️ 配置说明

### 环境变量

创建 `.env.local` 文件：
```bash
# 可选配置
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### SEO 配置

每个页面都有独立的 SEO 配置：
```typescript
export const metadata: Metadata = {
  title: '页面标题',
  description: '页面描述',
  keywords: '关键词',
  // ... 更多配置
}
```

## 🛠️ 开发指南

### 添加新页面

1. 在 `src/app/` 下创建新文件夹
2. 添加 `page.tsx` 文件
3. 更新导航组件
4. 添加到站点地图

### 自定义样式

项目使用 Tailwind CSS，可以在以下文件中自定义：
- `tailwind.config.ts` - Tailwind 配置
- `src/app/globals.css` - 全局样式

### 添加新的JSON工具

1. 在 `src/lib/jsonUtils.ts` 添加工具函数
2. 在 `JsonEditor.tsx` 添加UI控件
3. 实现相应的事件处理

## 📊 性能优化

- **静态生成** - 所有页面预渲染
- **代码分割** - 自动按路由分割
- **图片优化** - Next.js 自动优化
- **字体优化** - 自动内联字体
- **压缩** - 生产构建自动压缩

## 🔧 故障排除

### 常见问题

**Q: 开发服务器启动失败**
```bash
# 清除缓存重新安装
rm -rf node_modules .next
npm install
npm run dev
```

**Q: 构建错误**
```bash
# 检查 TypeScript 错误
npm run lint
```

**Q: 样式不生效**
```bash
# 重新构建 Tailwind
npm run build
```

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

### 开发流程
1. Fork 本仓库
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

### 代码规范
- 使用 ESLint 和 Prettier
- 遵循 TypeScript 严格模式
- 组件使用 Pascal 命名
- 函数使用 camelCase 命名

## 📄 许可证

本项目基于 [MIT 许可证](LICENSE) 开源。

## 🙏 致谢

- [Next.js](https://nextjs.org/) - React 框架
- [Tailwind CSS](https://tailwindcss.com/) - CSS 框架
- [TypeScript](https://www.typescriptlang.org/) - 类型支持
- [Vercel](https://vercel.com/) - 部署平台

## 📞 支持

- 🐛 [报告问题](https://github.com/onlythinking/jsonviewer/issues)
- 💡 [功能建议](https://github.com/onlythinking/jsonviewer/discussions)
- 📧 邮箱：support@jsontools.com

---

<div align="center">

**如果这个项目对你有帮助，请给它一个 ⭐️**

Made with ❤️ by [onlythinking](https://github.com/onlythinking)

</div>