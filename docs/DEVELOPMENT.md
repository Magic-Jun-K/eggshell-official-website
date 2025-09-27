# 开发规范与工程化配置

本项目的开发规范和工程化配置说明，采用 Monorepo 架构管理多个应用和共享包。

## Git 提交规范

本项目使用 Conventional Commits 规范，提交信息格式如下：

```
<type>(<scope>): <subject>
```

### 提交类型 (type)

- `feat`: 新功能
- `fix`: 修复bug
- `docs`: 文档变更
- `style`: 代码格式（不影响代码运行的变动）
- `refactor`: 重构（即不是新增功能，也不是修改bug的代码变动）
- `perf`: 性能优化
- `test`: 增加测试
- `build`: 构建过程或辅助工具的变动
- `ci`: CI 配置，脚本文件等改动
- `chore`: 其他改动（不在上述类型中的改动）
- `revert`: 回滚

### 示例

```bash
feat: 添加用户登录功能
fix(frontend): 修复导航栏样式问题
docs: 更新API文档
```

## 代码质量工具

### 1. Husky - Git Hooks

自动在 Git 操作前执行代码检查：

- `pre-commit`: 提交前自动格式化和检查代码
- `commit-msg`: 检查提交信息格式

### 2. Lint-staged

只对暂存区的文件进行检查，提高效率：

- 自动修复 ESLint 错误
- 自动格式化代码（Prettier）

### 3. Commitlint

确保提交信息符合规范，否则提交会被拒绝。

### 4. OXLint

快速的 JavaScript/TypeScript 代码检查工具。

### 5. Prettier

代码格式化工具，确保代码风格统一。

### 6. Turbo

高性能的构建系统，支持增量构建和缓存。

## 使用命令

```bash
# 开发模式
pnpm dev

# 构建项目
pnpm build

# 预览构建结果
pnpm preview

# 运行代码检查
pnpm lint

# 修复代码问题
pnpm lint:fix

# 类型检查
pnpm type-check

# 清理依赖和构建文件
pnpm clean

# 交互式提交
pnpm commit

# 检查提交信息格式
pnpm commitlint
```

## 环境要求

- **Node.js**: >= 22.0.0
- **pnpm**: >= 10.0.0

## 注意事项

1. **提交代码前**：代码会自动经过格式化和检查，确保质量
2. **提交信息**：必须符合规范，否则会被拒绝
3. **代码风格**：使用 Prettier 统一格式化，无需手动调整
4. **类型安全**：TypeScript 会检查类型错误
5. **Monorepo 管理**：使用 pnpm workspace 管理多个包
6. **构建优化**：使用 Turbo 进行增量构建和缓存优化

## 项目结构

本项目采用 Monorepo 架构，使用 pnpm workspace 管理：

```
eggshell-official-website/
├── apps/
│   ├── frontend/          # 前端应用
│   └── backend/           # 后端应用
├── packages/
│   └── ui/                # 共享 UI 组件库
├── docs/                  # 文档
└── 配置文件               # 根目录配置
```

## 自定义配置

- **Commitlint**: 修改 `commitlint.config.js`
- **Prettier**: 修改 `.prettierrc`
- **Lint-staged**: 修改 `.lintstagedrc`
- **OXLint**: 修改 `.oxlintrc.json`
- **Turbo**: 修改 `turbo.json`
- **pnpm Workspace**: 修改 `pnpm-workspace.yaml`
