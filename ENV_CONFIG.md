# 环境变量配置指南

## 概述

本文档详细说明了 JSON 格式化工具项目的环境变量配置，包括开发环境、生产环境以及 CI/CD 流程所需的配置。

## 🛠️ 开发环境配置

### 1. 创建本地环境文件

```bash
# 复制环境变量模板
cp .env.example .env.local

# 编辑环境变量
nano .env.local  # 或使用你喜欢的编辑器
```

### 2. 必需的环境变量

```bash
# 基础配置
NODE_ENV=development
NEXT_PUBLIC_APP_NAME="JSON Tools"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

## 🚀 Vercel 部署配置

### 1. Vercel 项目设置

在 Vercel Dashboard 中配置以下环境变量：

```bash
# 生产环境配置
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
```

### 2. 获取 Vercel 项目信息

```bash
# 安装 Vercel CLI
npm i -g vercel

# 登录并链接项目
vercel login
vercel link

# 获取项目 ID 和组织 ID
cat .vercel/project.json
```

## 🔐 GitHub Secrets 配置

在 GitHub 仓库的 Settings > Secrets and variables > Actions 中添加以下 secrets：

### 必需的 Secrets

| Secret Name | 描述 | 获取方式 |
|------------|------|---------|
| `VERCEL_TOKEN` | Vercel API Token | [Vercel Settings > Tokens](https://vercel.com/account/tokens) |
| `VERCEL_ORG_ID` | Vercel 组织 ID | `.vercel/project.json` 文件中的 `orgId` |
| `VERCEL_PROJECT_ID` | Vercel 项目 ID | `.vercel/project.json` 文件中的 `projectId` |

### 获取 Secrets 的详细步骤

#### 1. 获取 Vercel Token

```bash
# 方法1: 通过 Vercel Dashboard
# 访问: https://vercel.com/account/tokens
# 点击 "Create Token" 创建新 token

# 方法2: 通过 CLI
vercel tokens create
```

#### 2. 获取项目 ID 和组织 ID

```bash
# 在项目根目录执行
vercel link

# 查看生成的配置文件
cat .vercel/project.json

# 输出示例:
# {
#   "orgId": "team_xxxxxxxxxxxxxx",
#   "projectId": "prj_xxxxxxxxxxxxxx"
# }
```

## 🎯 可选配置

### 分析和监控

```bash
# Google Analytics (可选)
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=GA-XXXXXXXXX

# Sentry 错误监控 (可选)
SENTRY_DSN=your-sentry-dsn
NEXT_PUBLIC_SENTRY_DSN=your-sentry-dsn
```

### API 限制配置

```bash
# 可以在 vercel.json 或环境变量中配置
API_RATE_LIMIT_MAX=100
API_RATE_LIMIT_WINDOW_MS=900000
```

## 🔍 环境验证

### 开发环境验证

```bash
# 检查环境变量是否正确加载
npm run dev

# 访问 http://localhost:3000
# 检查控制台是否有环境变量相关错误
```

### 生产环境验证

```bash
# 本地构建测试
npm run build
npm run start

# 检查构建是否成功
```

## 🚨 安全注意事项

### 1. 环境文件安全

```bash
# 确保以下文件不被提交到 Git
echo '.env.local' >> .gitignore
echo '.env' >> .gitignore
echo '.vercel' >> .gitignore
```

### 2. Secrets 管理

- ✅ 所有敏感信息使用 GitHub Secrets
- ✅ 定期轮换 API tokens
- ✅ 使用最小权限原则
- ❌ 不要在代码中硬编码敏感信息

### 3. 环境变量命名

```bash
# 公开变量 (客户端可访问)
NEXT_PUBLIC_*

# 私有变量 (仅服务端可访问)
API_*
DATABASE_*
SECRET_*
```

## 🐛 故障排除

### 常见问题

1. **Vercel 部署失败**
   ```bash
   # 检查 GitHub Secrets 是否正确配置
   # 验证 Vercel token 是否有效
   vercel whoami
   ```

2. **环境变量未生效**
   ```bash
   # 重启开发服务器
   npm run dev
   
   # 清除 Next.js 缓存
   rm -rf .next
   ```

3. **GitHub Actions 失败**
   ```bash
   # 检查 workflow 文件语法
   # 验证所有必需的 secrets 是否已配置
   ```

## 📋 配置检查清单

- [ ] 复制 `.env.example` 为 `.env.local`
- [ ] 配置开发环境变量
- [ ] 创建 Vercel 项目
- [ ] 获取并配置 GitHub Secrets
- [ ] 测试本地开发环境
- [ ] 验证自动化部署流程
- [ ] 检查生产环境配置

## 📚 相关文档

- [Next.js 环境变量文档](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables)
- [Vercel 环境变量文档](https://vercel.com/docs/concepts/projects/environment-variables)
- [GitHub Actions Secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets)