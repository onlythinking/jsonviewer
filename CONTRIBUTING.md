# 贡献指南

感谢你对 JSON 在线格式化工具项目的关注！我们欢迎所有形式的贡献。

## 🚀 如何贡献

### 报告问题
- 使用 [GitHub Issues](https://github.com/onlythinking/jsonviewer/issues) 报告 bug
- 在提交问题前，请先搜索是否已有相似问题
- 提供详细的错误描述和复现步骤
- 包含相关的环境信息（浏览器版本、操作系统等）

### 功能建议
- 使用 [GitHub Discussions](https://github.com/onlythinking/jsonviewer/discussions) 提出功能建议
- 详细描述建议的功能和使用场景
- 解释该功能如何改善用户体验

### 代码贡献

#### 开发环境设置
1. Fork 这个仓库
2. 克隆你的 fork：
```bash
git clone https://github.com/yourusername/jsonviewer.git
cd jsonviewer
```
3. 安装依赖：
```bash
npm install
```
4. 启动开发服务器：
```bash
npm run dev
```

#### 提交流程
1. 创建新的功能分支：
```bash
git checkout -b feature/your-feature-name
```
2. 进行修改并测试
3. 确保代码通过 lint 检查：
```bash
npm run lint
```
4. 确保构建成功：
```bash
npm run build
```
5. 提交更改：
```bash
git commit -m "feat: 添加新功能描述"
```
6. 推送到你的分支：
```bash
git push origin feature/your-feature-name
```
7. 创建 Pull Request

## 📝 代码规范

### 命名约定
- **组件**：使用 PascalCase（如 `JsonEditor`）
- **函数/变量**：使用 camelCase（如 `validateJson`）
- **常量**：使用 UPPER_SNAKE_CASE（如 `MAX_FILE_SIZE`）
- **文件名**：使用 kebab-case（如 `json-utils.ts`）

### 代码风格
- 使用 TypeScript 严格模式
- 遵循 ESLint 和 Prettier 配置
- 使用 2 空格缩进
- 优先使用函数组件和 Hooks
- 添加适当的注释，特别是复杂逻辑

### Git 提交规范
使用 [Conventional Commits](https://www.conventionalcommits.org/) 格式：

```
type(scope): description

[optional body]

[optional footer]
```

**类型（type）：**
- `feat`: 新功能
- `fix`: 修复bug
- `docs`: 文档更新
- `style`: 代码格式修改
- `refactor`: 代码重构
- `test`: 测试相关
- `chore`: 构建或工具相关

**示例：**
```
feat(editor): 添加JSON语法高亮功能

- 实现了基于Token的语法高亮
- 支持不同数据类型的颜色区分
- 优化了大文件的渲染性能

Closes #123
```

## 🧪 测试

### 运行测试
```bash
# 运行所有测试
npm test

# 运行测试并监听文件变化
npm run test:watch

# 生成测试覆盖率报告
npm run test:coverage
```

### 编写测试
- 为新功能编写单元测试
- 确保测试覆盖率不低于现有水平
- 使用描述性的测试名称
- 测试文件放在 `__tests__` 目录或与源文件同目录

## 📚 文档

### 更新文档
- 更新相关的 README.md
- 为新功能添加使用示例
- 更新 API 文档（如果适用）
- 确保文档的准确性和完整性

### 文档风格
- 使用清晰、简洁的语言
- 提供实际的代码示例
- 使用合适的 Markdown 格式
- 包含截图或 GIF（如果有助于理解）

## 🔄 Pull Request 准则

### PR 描述
- 清楚地描述更改的内容和原因
- 引用相关的 Issues 或 Discussions
- 列出主要的更改点
- 包含测试说明（如果适用）

### PR 模板
```markdown
## 描述
简要描述这个 PR 的内容

## 更改类型
- [ ] Bug 修复
- [ ] 新功能
- [ ] 代码重构
- [ ] 文档更新
- [ ] 其他

## 相关 Issues
Closes #123

## 测试
- [ ] 已运行现有测试
- [ ] 已添加新测试
- [ ] 已手动测试

## 截图（如果适用）
添加截图来说明更改
```

### Review 流程
1. 维护者会 review 你的 PR
2. 根据反馈进行修改
3. 通过 review 后会被合并
4. 合并后相关分支会被删除

## 🏷️ 版本发布

项目使用 [Semantic Versioning](https://semver.org/)：
- **MAJOR** 版本：不兼容的 API 更改
- **MINOR** 版本：向下兼容的新功能
- **PATCH** 版本：向下兼容的 bug 修复

## 🎨 设计指南

### UI/UX 原则
- **简洁性**：界面简洁明了，避免不必要的复杂性
- **一致性**：保持设计风格和交互模式的一致性
- **可访问性**：确保所有用户都能使用，包括残障用户
- **响应性**：支持各种设备和屏幕尺寸

### 颜色规范
- **主色调**：蓝色系 (#3b82f6)
- **成功色**：绿色系 (#10b981)
- **警告色**：黄色系 (#f59e0b)
- **错误色**：红色系 (#ef4444)
- **中性色**：灰色系 (#6b7280)

## 🛡️ 安全

### 安全报告
如果发现安全漏洞，请不要在公开 Issue 中报告。请通过以下方式私下联系：
- 邮箱：security@jsontools.com

### 安全最佳实践
- 不要在代码中包含敏感信息
- 验证所有用户输入
- 使用 HTTPS 进行数据传输
- 定期更新依赖包

## 📞 联系方式

如果你有任何问题或需要帮助：
- 📧 邮箱：contribute@jsontools.com
- 💬 Discussions：[GitHub Discussions](https://github.com/onlythinking/jsonviewer/discussions)
- 🐛 Issues：[GitHub Issues](https://github.com/onlythinking/jsonviewer/issues)

## 🙏 致谢

感谢所有贡献者的付出！每一个贡献都让这个项目变得更好。

特别感谢：
- 所有报告 bug 的用户
- 提出功能建议的用户
- 提交代码的开发者
- 改进文档的贡献者

---

再次感谢你的贡献！🎉