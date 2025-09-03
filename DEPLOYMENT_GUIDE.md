# 🚀 JSON Formatter 部署指南

这是一个完整的从开发到生产环境部署的指南，包含手动部署和自动化部署两种方式。

## 📋 目录

- [快速开始](#快速开始)
- [准备工作](#准备工作)
- [方式一：手动部署](#方式一手动部署)
- [方式二：自动化部署](#方式二自动化部署)
- [环境配置](#环境配置)
- [监控和维护](#监控和维护)
- [常见问题](#常见问题)
- [最佳实践](#最佳实践)

---

## 🏁 快速开始

如果你只是想快速部署，按照以下步骤：

```bash
# 1. 克隆项目
git clone <your-repo-url>
cd jsonviewer

# 2. 安装依赖和设置开发环境
./scripts/dev-setup.sh

# 3. 部署到 Vercel
./scripts/deploy.sh preview
```

---

## 🛠️ 准备工作

### 1. 环境要求

- **Node.js**: 18.x 或更高版本
- **npm**: 8.x 或更高版本
- **Git**: 用于版本控制
- **GitHub 账户**: 用于代码托管和自动化部署
- **Vercel 账户**: 用于部署托管

### 2. 项目结构

```
jsonviewer/
├── .github/workflows/       # GitHub Actions 工作流
├── scripts/                 # 部署和开发脚本
├── src/                    # 源代码
├── public/                 # 静态资源
├── .env.example            # 环境变量模板
├── vercel.json             # Vercel 配置
├── ENV_CONFIG.md           # 环境配置文档
└── DEPLOYMENT_GUIDE.md     # 本文档
```

### 3. 账户准备

#### GitHub 账户设置
1. 创建新仓库或使用现有仓库
2. 将代码推送到 GitHub

#### Vercel 账户设置
1. 注册 [Vercel 账户](https://vercel.com)
2. 连接 GitHub 账户

---

## 📱 方式一：手动部署

适合：首次部署、测试、或不需要自动化的场景

### 步骤 1: 本地环境设置

```bash
# 克隆项目
git clone <your-repo-url>
cd jsonviewer

# 安装依赖
npm install

# 创建环境配置文件
cp .env.example .env.local

# 编辑环境变量（可选）
nano .env.local
```

### 步骤 2: 验证项目

```bash
# 代码检查
npm run lint

# 类型检查
npm run type-check

# 测试构建
npm run build

# 本地测试
npm run dev
# 访问 http://localhost:3000 验证功能
```

### 步骤 3: Vercel CLI 部署

```bash
# 安装 Vercel CLI
npm install -g vercel

# 登录 Vercel
vercel login

# 首次部署（会创建项目）
vercel

# 后续部署
vercel --prod  # 生产环境
vercel         # 预览环境
```

### 步骤 4: 使用部署脚本

```bash
# 预览环境部署
./scripts/deploy.sh preview

# 生产环境部署
./scripts/deploy.sh production
```

---

## 🤖 方式二：自动化部署

适合：团队协作、持续集成、生产环境

### 步骤 1: GitHub 仓库设置

确保代码已推送到 GitHub 仓库，包含所有必要的配置文件：
- `.github/workflows/deploy.yml`
- `.github/workflows/quality.yml`
- `vercel.json`
- `.env.example`

### 步骤 2: 获取 Vercel 配置信息

```bash
# 在项目目录下执行
vercel login
vercel link

# 查看项目配置
cat .vercel/project.json
```

记录以下信息：
- `orgId`: 组织 ID
- `projectId`: 项目 ID

### 步骤 3: 配置 GitHub Secrets

在 GitHub 仓库的 **Settings > Secrets and variables > Actions** 中添加：

| Secret Name | 值 | 获取方式 |
|-------------|-----|----------|
| `VERCEL_TOKEN` | Vercel API Token | [创建 Token](https://vercel.com/account/tokens) |
| `VERCEL_ORG_ID` | 组织 ID | `.vercel/project.json` 中的 `orgId` |
| `VERCEL_PROJECT_ID` | 项目 ID | `.vercel/project.json` 中的 `projectId` |

### 步骤 4: 触发自动部署

```bash
# 推送代码到 main/master 分支 -> 自动部署到生产环境
git add .
git commit -m "feat: 添加新功能"
git push origin main

# 创建 Pull Request -> 自动创建预览环境
git checkout -b feature/new-feature
git push origin feature/new-feature
# 在 GitHub 创建 PR
```

### 步骤 5: 验证自动化流程

1. **代码质量检查**: 每次推送都会运行 ESLint、TypeScript 检查
2. **预览部署**: PR 创建时自动部署预览环境
3. **生产部署**: 合并到 main 分支后自动部署生产环境
4. **部署通知**: GitHub 会显示部署状态和链接

---

## ⚙️ 环境配置

### 开发环境变量

```bash
# .env.local
NODE_ENV=development
NEXT_PUBLIC_APP_NAME="JSON Tools"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 生产环境变量

在 Vercel Dashboard 的项目设置中配置：

```bash
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
```

### 可选配置

```bash
# 分析工具
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=GA-XXXXXXXXX

# 错误监控
SENTRY_DSN=your-sentry-dsn
NEXT_PUBLIC_SENTRY_DSN=your-sentry-dsn
```

详细环境配置请参考 [ENV_CONFIG.md](./ENV_CONFIG.md)

---

## 📊 监控和维护

### 1. 部署监控

- **Vercel Dashboard**: 查看部署状态、性能指标
- **GitHub Actions**: 查看构建日志、部署历史
- **Real User Monitoring**: 监控实际用户体验

### 2. 错误监控

```javascript
// 可选：集成 Sentry
import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
})
```

### 3. 性能监控

```bash
# 构建分析
npm run analyze

# Lighthouse 性能测试
npx lighthouse https://your-domain.vercel.app
```

### 4. 日志查看

```bash
# Vercel 日志
vercel logs

# GitHub Actions 日志
# 在 GitHub 仓库的 Actions 标签查看
```

---

## 🔧 常见问题

### Q: 部署失败，提示 "Build Error"

**A:** 检查以下项目：
```bash
# 本地测试构建
npm run build

# 检查依赖
npm audit fix

# 检查 Node.js 版本
node --version  # 应该 >= 18.0.0
```

### Q: GitHub Actions 失败

**A:** 检查 Secrets 配置：
1. 确认所有必需的 Secrets 都已配置
2. 验证 `VERCEL_TOKEN` 是否有效
3. 检查工作流文件语法

### Q: 自动部署不触发

**A:** 检查以下配置：
1. 推送的分支是否正确 (main/master)
2. `.github/workflows/` 文件是否存在
3. GitHub Actions 是否启用

### Q: 预览环境无法访问

**A:** 检查：
1. Vercel 项目是否正确链接
2. 域名配置是否正确
3. 安全头部配置是否过于严格

### Q: 构建时间过长

**A:** 优化建议：
```bash
# 清理缓存
npm run clean
npm install

# 检查依赖大小
npx bundle-analyzer

# 启用 Vercel 缓存
# 在 vercel.json 中已配置缓存策略
```

---

## 💡 最佳实践

### 1. 分支策略

```
main/master    → 生产环境 (自动部署)
develop        → 开发环境 (可选)
feature/*      → 功能分支 (PR 预览)
hotfix/*       → 热修复分支
```

### 2. 代码质量

```bash
# 提交前检查
npm run pre-commit

# 或设置 Git hooks
npx husky install
npx husky add .husky/pre-commit "npm run pre-commit"
```

### 3. 环境管理

```bash
# 不同环境使用不同配置
.env.local          # 本地开发
.env.staging        # 测试环境
.env.production     # 生产环境 (Vercel 配置)
```

### 4. 安全考虑

- ✅ 所有敏感信息使用环境变量
- ✅ 启用 HTTPS 和安全头部
- ✅ 定期更新依赖
- ✅ 使用最新的 Node.js LTS 版本

### 5. 性能优化

- ✅ 启用静态资源缓存
- ✅ 使用 CDN 加速
- ✅ 压缩图片和资源
- ✅ 代码分割和懒加载

### 6. 监控和日志

- ✅ 集成错误监控服务
- ✅ 设置性能监控
- ✅ 配置部署通知
- ✅ 定期检查部署状态

---

## 🔗 相关资源

- [Next.js 文档](https://nextjs.org/docs)
- [Vercel 文档](https://vercel.com/docs)
- [GitHub Actions 文档](https://docs.github.com/en/actions)
- [项目环境配置](./ENV_CONFIG.md)
- [项目主文档](./CLAUDE.md)

---

## 📞 支持和反馈

如果遇到问题或有改进建议，请：
1. 查看本文档的常见问题部分
2. 检查 [GitHub Issues](../../issues)
3. 创建新的 Issue 描述问题

---

**🎉 祝你部署成功！**