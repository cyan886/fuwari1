# Fuwari Project Context

> 本文档是 AI 理解项目的基石，请保持与 `claude.md` 同步更新。

## Project Overview

**Fuwari** 是一个基于 **Astro** 构建的静态博客模板，使用 **Svelte** 和 **Tailwind CSS** 实现高度自定义、高性能和优美的视觉效果。

**技术栈：**
- **Framework:** Astro 5.x
- **Styling:** Tailwind CSS 3.x
- **Interactivity:** Svelte 5.x
- **Content:** Astro Content Collections (Markdown)
- **Package Manager:** pnpm 9.x
- **Linting:** Biome

**核心特性：**
- 搜索、目录导航 (TOC)、文章置顶
- 图片回退 (双 CDN)、防盗链保护
- 分析集成 (Umami、Google Analytics)
- IndexNow 搜索引擎快速收录

---

## Architecture & Structure

### Key Directories
| 目录 | 说明 |
| :--- | :--- |
| `src/content/posts/` | 博客文章 (Markdown) |
| `src/config.ts` | **主配置文件**（站点、导航、个人资料、功能开关） |
| `src/components/` | UI 组件 (Astro + Svelte) |
| `src/layouts/` | 页面布局 |
| `src/pages/` | 路由页面与 API 端点 |
| `src/plugins/` | 自定义 Rehype/Remark 插件 |
| `public/` | 静态资源 |
| `scripts/` | 工具脚本 (迁移、IndexNow 提交等) |

### Key Configuration Files
| 文件 | 说明 |
| :--- | :--- |
| `astro.config.mjs` | Astro 项目配置 |
| `src/config.ts` | 用户配置入口 |
| `src/content/config.ts` | Content Collections Schema |
| `tailwind.config.cjs` | Tailwind CSS 配置 |

---

## Development Workflow

### Prerequisites
- Node.js 18+ (LTS)
- pnpm 9+

### Common Commands

| 命令 | 说明 |
| :--- | :--- |
| `pnpm install` | 安装依赖 |
| `pnpm dev` | 启动开发服务器 (`localhost:4321`) |
| `pnpm build` | 构建生产版本到 `./dist/` |
| `pnpm preview` | 预览生产构建 |
| `pnpm new-post <filename>` | 创建新文章模板 |
| `pnpm lint` | Biome 代码检查 |
| `pnpm format` | Biome 代码格式化 |

### Creating Content

文章位于 `src/content/posts/`，Frontmatter 格式：
```yaml
---
title: "Post Title"
published: 2023-01-01
description: "Short description"
image: "./cover.jpg"
tags: ["Tag1", "Tag2"]
category: "Category"
draft: false
pinned: false           # 是否置顶
lang: zh_CN             # 语言 (可选)
---
```

---

## IndexNow 搜索引擎快速收录

### 功能概述
集成 IndexNow 协议，自动向 Bing、Yandex 等搜索引擎提交 URL，加速内容收录。

### 核心文件
| 文件 | 说明 |
| :--- | :--- |
| `public/4ff84931e3084c36bcc43c09ec05df75.txt` | IndexNow 验证密钥 |
| `src/pages/api/indexnow.ts` | IndexNow API 端点 |
| `src/pages/api/webhook/indexnow.ts` | Webhook 处理端点 |
| `scripts/submit-indexnow.mjs` | 全量提交脚本 |
| `scripts/submit-indexnow-incremental.mjs` | **增量提交脚本（推荐）** |

### 命令一览

| 命令 | 说明 |
| :--- | :--- |
| `pnpm build:indexnow` | 构建并提交到搜索引擎 |
| `pnpm submit-indexnow` | 仅提交所有 URL（不构建） |
| `pnpm submit-indexnow-inc` | **增量提交**（仅新增 URL） |
| `pnpm submit-indexnow-force` | 强制提交所有 URL |
| `pnpm indexnow-status` | 查看提交状态 |
| `pnpm indexnow-clear` | 清除提交历史 |

### 增量提交原理
1. 读取 `sitemap.xml` 中的所有 URL
2. 对比 `.indexnow-submitted.json` 中已提交记录
3. 仅提交新增 URL，节省 API 配额
4. 提交成功后更新记录文件

> ⚠️ `.indexnow-submitted.json` 会自动生成，**请勿提交到 Git**。

### 支持的搜索引擎
| 端点 | 说明 |
| :--- | :--- |
| `api.indexnow.org` | 通用端点 |
| `www.bing.com/indexnow` | Microsoft Bing |
| `yandex.com/indexnow` | Yandex |

### API 响应处理
不同端点返回格式不同：
- **api.indexnow.org / Bing**: 返回空响应体 (Content-Length: 0)
- **Yandex**: 返回 JSON 格式 `{"success":true}`

脚本已处理两种情况，无需担心 JSON 解析错误。

### 状态码说明
| 状态码 | 说明 |
| :--- | :--- |
| `200` | 成功接收并处理 |
| `202` | 成功接收，稍后处理 |
| `400` | 请求格式错误 |
| `403` | 密钥验证失败 |
| `422` | URL 格式错误或过多 |
| `429` | 请求频率过高 |

### 故障排除
```bash
# 查看详细日志
pnpm submit-indexnow

# 检查 API 状态
curl https://www.micostar.cc/api/indexnow

# 验证密钥文件
curl https://www.micostar.cc/4ff84931e3084c36bcc43c09ec05df75.txt
```

---

## Conventions

- **Styling:** 使用 Tailwind CSS 工具类，自定义样式在 `src/styles/`
- **Components:** 静态内容用 Astro 组件，交互元素用 Svelte
- **Type Safety:** 严格 TypeScript 模式，类型定义在 `src/types/`
- **Formatting:** 使用 Biome (`biome.json`)

---

## Integrations & Plugins

- **Expressive Code:** 代码语法高亮 (GitHub Dark 主题)
- **Remark/Rehype:** Markdown 处理链（KaTeX 数学公式、Admonitions、GitHub Cards）
- **Swup:** 平滑页面过渡动画
- **Mermaid:** 流程图/序列图渲染

---

## Mermaid 图表集成

### 实现位置
`src/pages/posts/[...slug].astro` 中嵌入了 Mermaid.js 初始化脚本。

### 特性
- **异步加载**: Mermaid 脚本动态注入，不阻塞页面渲染
- **串行渲染**: 避免并行渲染导致的竞态条件
- **主题同步**: 监听主题切换自动重新渲染
- **Swup 兼容**: 页面切换后自动初始化
- **Details 标签支持**: 折叠区展开时延迟渲染

### 已知问题修复
- `mermaid is not defined` 错误：MutationObserver 中添加了存在性检查

---

## 移动端性能优化

### CSS `content-visibility` 优化
位于 `src/styles/markdown.css`，仅在移动端 (≤768px) 启用：

| 元素 | 预估高度 | 说明 |
| :--- | :--- | :--- |
| `.expressive-code` | 200px | 代码块 |
| `details` | 100px | 折叠区 |
| `.katex-display` | 80px | 数学公式 |
| `.mermaid` | 300px | 流程图 |

**原理**: `content-visibility: auto` 让浏览器跳过屏幕外元素的渲染，显著减少首屏渲染时间。

