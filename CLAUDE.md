# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

这是一个基于 Next.js 15 的 JSON 在线格式化工具，提供 JSON 格式化、验证、压缩等功能。项目使用 TypeScript + Tailwind CSS，采用 App Router 架构，具有完整的安全防护机制。

## 开发命令

```bash
# 开发环境
npm run dev          # 启动开发服务器 (http://localhost:3000)

# 构建和部署
npm run build        # 构建生产版本
npm run start        # 启动生产服务器
npm run lint         # 代码检查和格式化
```

## 核心架构

### App Router 结构 (src/app/)
- **主页面** (`/`): JSON 格式化工具主界面
- **验证器** (`/validator`): JSON 语法验证工具
- **压缩器** (`/minifier`): JSON 压缩工具  
- **教程中心** (`/tutorials`): JSON 学习资源

每个页面都有独立的 `page.tsx` 和完整的 SEO metadata 配置。

### 安全架构 (src/lib/jsonUtils.ts)

项目实现了多层安全防护：

```typescript
// 安全限制常量
export const SECURITY_LIMITS = {
  MAX_JSON_SIZE: 10 * 1024 * 1024, // 10MB
  MAX_DEPTH: 50,                   // 最大嵌套深度
  MAX_KEYS: 10000,                 // 最大键数量
  MAX_STRING_LENGTH: 1000000,      // 单个字符串最大长度
}
```

**关键安全功能：**
- `validateInputSecurity()`: 输入内容安全检查，防止恶意模式
- `sanitizeJsonInput()`: 清理控制字符和统一换行符
- `validateJsonStructure()`: 递归验证数据结构，防止原型污染
- 危险键名检测: `__proto__`, `constructor`, `prototype`

### 核心组件 (src/components/JsonEditor.tsx)

主要的 JSON 处理组件，集成了所有安全验证：

**状态管理：**
- `validationResult`: JSON 验证结果
- `securityWarnings`: 安全警告信息
- `stats`: 数据统计分析

**核心方法：**
- `handleInputChange()`: 带安全验证的输入处理
- `validateAndProcess()`: JSON 验证和分析
- `handleFormat()`/`handleCompress()`: 安全的格式化/压缩操作

### 语法高亮系统

自定义实现的 JSON 语法高亮，包含：
- Token 化解析 (`tokenizeJsonLine()`)
- 类型识别 (key, string, number, boolean, null, bracket)
- CSS 类映射 (json-key, json-string, json-number 等)

### SEO 配置

每个页面都有完整的 metadata：
```typescript
export const metadata: Metadata = {
  title: '页面标题 | JSON Tools',
  description: '页面描述',
  keywords: ['相关', '关键词'],
  openGraph: { /* OG 配置 */ },
  // 结构化数据和规范 URL
}
```

## 安全考虑

### Next.js 安全头部配置 (next.config.js)
- Content Security Policy: 严格的 CSP 规则
- 防护头部: X-Content-Type-Options, X-Frame-Options, HSTS
- 权限策略: 禁用相机、麦克风等敏感 API

### 输入验证流程
1. **大小检查**: 限制输入文件大小
2. **模式检测**: 检测潜在恶意内容模式
3. **结构验证**: 验证 JSON 数据结构安全性
4. **清理处理**: 移除控制字符，统一格式

## Tailwind CSS 定制

### 自定义主题 (tailwind.config.ts)
```typescript
theme: {
  extend: {
    colors: {
      json: {
        key: '#0066cc',
        string: '#008000', 
        number: '#ff6600',
        boolean: '#0066cc',
        null: '#999999',
      }
    }
  }
}
```

### 工具类 (src/app/globals.css)
- `.json-*`: JSON 语法高亮样式
- `.btn-primary/.btn-secondary`: 标准按钮样式
- `.code-editor`: 代码编辑器样式
- `.scrollbar-thin`: 自定义滚动条

## 部署配置

### Vercel 配置 (vercel.json)
- 自动构建: Next.js framework detection
- 安全头部: 生产环境安全配置
- 重定向规则: `/json` -> `/`
- 区域优化: 亚洲地区 (sin1, hkg1, nrt1)

## 开发注意事项

### 安全优先
- 所有 JSON 处理必须通过 `validateInputSecurity()`
- 用户输入需要通过 `sanitizeJsonInput()` 清理
- 避免直接使用 `JSON.parse()` 解析未验证的数据

### 组件开发
- 使用 TypeScript 严格模式
- 遵循 ESLint 配置 (eslint-config-next)
- 新组件需要支持 `className` prop 进行样式自定义

### 页面开发
- 每个新页面必须有完整的 metadata 配置
- 使用相同的 Header/Footer 布局组件
- 确保响应式设计支持

### 样式规范
- 优先使用 Tailwind 工具类
- 自定义样式放在 `globals.css` 的 `@layer` 中
- 保持颜色主题一致性 (蓝色主题)