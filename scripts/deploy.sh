#!/bin/bash

# JSON Formatter 部署脚本
# 用法: ./scripts/deploy.sh [preview|production]

set -e

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 获取部署类型
DEPLOY_TYPE=${1:-preview}

echo -e "${BLUE}🚀 开始部署 JSON Formatter 到 Vercel...${NC}"
echo -e "${BLUE}📦 部署类型: ${DEPLOY_TYPE}${NC}"
echo ""

# 检查依赖
if ! command -v vercel &> /dev/null; then
    echo -e "${RED}❌ Vercel CLI 未安装${NC}"
    echo -e "${YELLOW}💡 请运行: npm install -g vercel${NC}"
    exit 1
fi

# 检查是否登录 Vercel
if ! vercel whoami &> /dev/null; then
    echo -e "${RED}❌ 未登录 Vercel${NC}"
    echo -e "${YELLOW}💡 请运行: vercel login${NC}"
    exit 1
fi

echo -e "${BLUE}🔍 执行部署前检查...${NC}"

# 代码质量检查
echo -e "${YELLOW}⚡ 运行 ESLint...${NC}"
npm run lint

echo -e "${YELLOW}🏷️  TypeScript 类型检查...${NC}"
npm run type-check

echo -e "${YELLOW}💅 代码格式检查...${NC}"
npm run format:check || {
    echo -e "${YELLOW}📝 自动修复代码格式...${NC}"
    npm run format
}

# 构建测试
echo -e "${YELLOW}🔨 测试构建...${NC}"
npm run build

echo -e "${GREEN}✅ 所有检查通过！${NC}"
echo ""

# 开始部署
echo -e "${BLUE}🚀 开始部署到 Vercel...${NC}"

if [ "$DEPLOY_TYPE" = "production" ]; then
    echo -e "${GREEN}🌟 部署到生产环境...${NC}"
    DEPLOY_URL=$(vercel --prod --confirm)
else
    echo -e "${YELLOW}🔍 部署到预览环境...${NC}"
    DEPLOY_URL=$(vercel --confirm)
fi

echo ""
echo -e "${GREEN}🎉 部署成功！${NC}"
echo -e "${GREEN}🔗 部署地址: ${DEPLOY_URL}${NC}"

# 可选：打开浏览器
if command -v open &> /dev/null; then
    echo -e "${BLUE}🌐 打开部署地址...${NC}"
    open "$DEPLOY_URL"
elif command -v xdg-open &> /dev/null; then
    echo -e "${BLUE}🌐 打开部署地址...${NC}"
    xdg-open "$DEPLOY_URL"
fi

echo ""
echo -e "${GREEN}✨ 部署完成！${NC}"