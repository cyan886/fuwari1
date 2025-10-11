# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

这是一个基于 Astro 框架的静态博客模板，名为 Fuwari。项目使用 TypeScript、Tailwind CSS 和 Svelte 组件构建。

## 核心架构

### 技术栈
- **框架**: Astro 5.x 作为主要静态站点生成器
- **样式**: Tailwind CSS + Stylus 预处理器
- **组件**: Svelte 组件与 Astro 组件混合使用
- **包管理**: pnpm 9.x
- **类型检查**: TypeScript
- **代码质量**: Biome 用于格式化和 linting
- **内容管理**: Astro Content Collections

### 目录结构
- `src/config.ts` - 主要配置文件（站点配置、导航、个人资料等）
- `src/content/` - Content Collections
  - `posts/` - 博客文章 Markdown 文件
  - `spec/` - 特殊页面（如 About）
  - `config.ts` - Content Collections Schema 定义
- `src/components/` - 可复用组件（Astro 和 Svelte）
- `src/layouts/` - 页面布局模板
- `src/pages/` - 路由页面和 API 端点
- `src/plugins/` - 自定义 remark/rehype 插件
- `src/styles/` - 全局样式文件
- `src/utils/` - 工具函数
- `scripts/` - 构建和部署脚本

### Content Collections 架构
项目使用 Astro Content Collections 管理内容，定义了三个集合：

1. **posts** - 博客文章集合，包含完整的类型验证
   - 字段：title, published, updated, draft, description, image, tags, lang, pinned
   - 所有文章存储在 `src/content/posts/` 目录

2. **spec** - 特殊页面集合（如 About 页面）
   - 字段：title, published, updated, draft

3. **assets** - 资源数据集合（data collection）
   - 字段：title, description

### 关键特性
- 支持深色/浅色主题切换
- 页面过渡动画（Swup）
- 数学公式渲染（KaTeX）
- 代码语法高亮（Expressive Code）
- 图片回退机制
- SEO 优化（sitemap、RSS）
- IndexNow 搜索引擎提交
- 音乐播放器组件

## 常用开发命令

### 基础开发
```bash
pnpm install && pnpm add sharp  # 安装依赖（sharp 需要单独安装）
pnpm dev                        # 启动开发服务器 (localhost:4321)
pnpm build                      # 构建生产版本
pnpm preview                    # 预览构建结果
pnpm astro check                # 检查 Astro 组件的类型错误
```

### 代码质量
```bash
pnpm lint                       # 使用 Biome 检查和修复代码
pnpm format                     # 格式化代码
pnpm type-check                 # TypeScript 类型检查
```

### 内容管理
```bash
pnpm new-post <filename>        # 创建新博客文章
```

### SQLite 迁移（实验性）
```bash
# 预览数据库结构和映射
pnpm node scripts/migrate-from-sqlite.mjs --db "path/to/database.db" --dry-run

# 导出 Markdown 文章到 src/content/posts
pnpm node scripts/migrate-from-sqlite.mjs --db "path/to/database.db" --out ./src/content/posts
```

### IndexNow SEO
```bash
pnpm build:indexnow            # 构建并提交到搜索引擎
pnpm submit-indexnow-inc       # 增量提交新内容（仅提交新增URL）
pnpm submit-indexnow-force     # 强制提交所有内容
pnpm indexnow-status           # 查看提交状态
pnpm indexnow-clear            # 清除提交历史

# IndexNow 增量提交原理：
# - 自动比对 sitemap.xml 中的 URL 与 .indexnow-submitted.json 记录
# - 仅提交新增的 URL，节省 API 配额
# - 记录文件 .indexnow-submitted.json 会自动生成，请勿提交到 Git
```

## 配置文件

### 主要配置 (`src/config.ts`)
- `siteConfig` - 网站基本信息、主题色、横幅设置
- `navBarConfig` - 导航栏链接配置
- `profileConfig` - 作者个人资料配置
- `imageFallbackConfig` - 图片回退域名配置
- `umamiConfig` - 网站分析配置
- `googleAnalyticsConfig` - Google Analytics 配置

### 博客文章 Frontmatter
创建新文章时需要包含以下 frontmatter 字段：

```yaml
---
title: 文章标题          # 必填：文章标题
published: 2024-01-01   # 必填：发布日期（YYYY-MM-DD 格式）
updated: 2024-01-02     # 可选：更新日期
draft: false            # 可选：是否为草稿（默认 false）
description: 文章摘要   # 可选：文章描述/摘要
image: ./cover.jpg      # 可选：封面图片路径
tags: [标签1, 标签2]    # 可选：标签数组
lang: zh_CN             # 可选：语言代码（不同于网站默认语言时设置）
pinned: false           # 可选：是否置顶（默认 false）
---
```

### Astro 配置 (`astro.config.mjs`)
- 网站 URL: `https://www.micostar.tech`
- 集成了 Tailwind、Svelte、Sitemap、Icon、Swup、Expressive Code
- 配置了丰富的 Markdown 处理插件链
- 自定义组件：github 卡片、提示框等

### 图片回退机制
通过自定义 rehype 插件 `rehype-image-fallback` 实现：
- **工作原理**：在 HTML 生成阶段，为所有来自主图床的 `<img>` 标签添加 `onerror` 属性
- **回退逻辑**：当主图床图片加载失败时，自动替换为备用图床的对应 URL
- **配置**：在 `src/config.ts` 的 `imageFallbackConfig` 中设置主图床和备用图床域名
- **示例**：如果 `https://image.cloudrunmax.top/file/image.jpg` 加载失败，自动切换到 `https://images.ai0728.com.cn/file/image.jpg`

## 插件系统

### Remark 插件（Markdown 处理）
- `remark-math` - 数学公式支持
- `remark-reading-time` - 阅读时间计算
- `remark-excerpt` - 文章摘要提取
- `remark-directive` - 自定义指令支持

### Rehype 插件（HTML 处理）
- `rehype-katex` - 数学公式渲染
- `rehype-slug` - 标题 ID 生成
- `rehype-autolink-headings` - 标题锚点链接
- `rehype-external-links` - 外部链接处理
- 自定义组件：github 卡片、admonition 框

### Expressive Code 自定义插件
项目使用 Astro Expressive Code 处理代码块，包含以下自定义插件：
- `pluginCollapsibleSections` - 可折叠代码区域
- `pluginLineNumbers` - 行号显示
- `pluginCustomCopyButton` - 自定义复制按钮（带图标切换效果）
  - 位置：`src/plugins/expressive-code/custom-copy-button.ts`
  - 功能：自定义样式的复制按钮，支持复制成功/失败视觉反馈

## 部署说明

### Vercel 部署配置
- 目标平台：Vercel（默认配置）
- 构建输出：`./dist/` 目录
- 部署区域：`hkg1`（香港）
- 需要在部署前配置 `astro.config.mjs` 中的站点 URL

### Vercel 特定配置 (`vercel.json`)
- **安全头**：配置了 X-Content-Type-Options、X-Frame-Options、X-XSS-Protection
- **静态资源缓存**：JS、CSS、图片等静态资源设置为长期缓存（1年）
- **URL 重写**：`/sitemap.xml` 重写到 `/sitemap-index.xml`
- **重定向规则**：配置了多个永久重定向，包括短链接（/606、/608）

## 开发注意事项

### 代码规范
- 使用 tab 缩进（Biome 配置）
- 双引号字符串（JavaScript/TypeScript）
- Svelte 和 Astro 文件有特殊的 linting 规则（禁用 useConst 和 useImportType）

### TypeScript 路径别名
项目配置了以下路径别名（`tsconfig.json`）：
- `@components/*` → `src/components/*`
- `@assets/*` → `src/assets/*`
- `@constants/*` → `src/constants/*`
- `@utils/*` → `src/utils/*`
- `@i18n/*` → `src/i18n/*`
- `@layouts/*` → `src/layouts/*`
- `@/*` → `src/*`

### 内容管理
- 图片支持回退机制：使用 `imageFallbackConfig` 中配置的主图床域名的图片，在加载失败时会自动切换到备用图床
- 博客文章需遵循 frontmatter 格式（参见"博客文章 Frontmatter"章节）
- 新建博客文章使用 `pnpm new-post <filename>` 命令，会自动生成带有正确 frontmatter 的模板文件
- 支持多级目录：`pnpm new-post folder/subfolder/article` 会自动创建目录结构

### API 路由
项目包含以下 API 端点：
- `/api/indexnow` - IndexNow 验证端点
- `/api/webhook/indexnow` - IndexNow webhook 处理端点