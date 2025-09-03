#!/bin/bash

# 开发环境设置脚本
# 用于快速设置开发环境

set -e

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🛠️  JSON Formatter 开发环境设置${NC}"
echo ""

# 检查 Node.js 版本
NODE_VERSION=$(node --version)
echo -e "${BLUE}📋 Node.js 版本: ${NODE_VERSION}${NC}"

# 安装依赖
echo -e "${YELLOW}📦 安装项目依赖...${NC}"
npm install

# 创建环境文件
if [ ! -f .env.local ]; then
    echo -e "${YELLOW}🔧 创建环境配置文件...${NC}"
    cp .env.example .env.local
    echo -e "${GREEN}✅ 已创建 .env.local 文件，请编辑配置实际值${NC}"
else
    echo -e "${GREEN}✅ 环境配置文件已存在${NC}"
fi

# 运行代码质量检查
echo -e "${YELLOW}🔍 运行代码质量检查...${NC}"
npm run lint || echo -e "${YELLOW}⚠️  ESLint 检查有警告，建议修复${NC}"

echo -e "${YELLOW}🏷️  TypeScript 类型检查...${NC}"
npm run type-check || echo -e "${YELLOW}⚠️  TypeScript 类型检查有问题，建议修复${NC}"

# 测试构建
echo -e "${YELLOW}🔨 测试项目构建...${NC}"
npm run build

echo ""
echo -e "${GREEN}🎉 开发环境设置完成！${NC}"
echo ""
echo -e "${BLUE}📝 可用的开发命令:${NC}"
echo -e "  ${GREEN}npm run dev${NC}          - 启动开发服务器"
echo -e "  ${GREEN}npm run build${NC}        - 构建项目"
echo -e "  ${GREEN}npm run lint${NC}         - 代码检查"
echo -e "  ${GREEN}npm run lint:fix${NC}     - 自动修复代码问题"
echo -e "  ${GREEN}npm run type-check${NC}   - TypeScript 类型检查"
echo -e "  ${GREEN}npm run format${NC}       - 格式化代码"
echo -e "  ${GREEN}npm run pre-commit${NC}   - 提交前检查"
echo ""
echo -e "${BLUE}🚀 部署相关命令:${NC}"
echo -e "  ${GREEN}npm run deploy:preview${NC} - 部署到预览环境"
echo -e "  ${GREEN}npm run deploy:prod${NC}    - 部署到生产环境"
echo -e "  ${GREEN}./scripts/deploy.sh${NC}    - 使用部署脚本"
echo ""
echo -e "${YELLOW}💡 开始开发:${NC}"
echo -e "  ${GREEN}npm run dev${NC}"