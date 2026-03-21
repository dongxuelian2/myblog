---
title: 用 Nuxt Content 搭建静态博客的完整流程
description: 从零开始用 Nuxt 3 + Nuxt Content 搭一个静态博客，记录过程中的关键决策和踩过的坑。
date: 2026-03-17
tags:
  - Nuxt
  - 前端
  - 搭建
cover: /images/covers/hello-nuxt.svg
coverAlt: 几何线条与同心圆构成的冷调技术封面。
---

## 为什么选 Nuxt Content

做个人博客有很多选项——Hugo、Jekyll、Astro、Next.js，甚至直接手写 HTML。最后选了 Nuxt Content，原因很具体：

1. **Vue 生态**：日常工作用 Vue，不想在博客项目里额外学一套模板语言。
2. **Markdown 驱动**：所有内容都是 `.md` 文件，不需要数据库，不需要 CMS 后台。
3. **静态生成**：`nuxt generate` 直接输出纯 HTML，部署到 GitHub Pages 零成本。
4. **查询 API**：`queryCollection` 提供了类 ORM 的内容查询方式，比手动读文件系统舒服得多。

## 项目结构

最终的目录结构很简单：

```
content/posts/     ← Markdown 文章
components/        ← Vue 组件
pages/             ← 路由页面
public/images/     ← 静态资源
assets/css/        ← 全局样式
```

没有用复杂的嵌套布局、没有做 i18n、没有接第三方评论系统。一个人的博客，够用就行。

## 关键决策

### 样式方案：Tailwind CSS

犹豫过要不要用 UnoCSS，最后还是选了 Tailwind。理由是 `@tailwindcss/typography` 插件对中文长文的排版支持足够好，配合自定义的 `prose-journal` 变体，可以精确控制行高、段距、标题字体。

### 部署：GitHub Pages + GitHub Actions

每次 push 到 `master` 自动触发构建和部署。整个 CI 流程不到两分钟。唯一需要注意的是 `baseURL` 的处理——如果仓库名不是 `username.github.io`，需要动态设置 base path。

### 内容模式：Front Matter 定义元数据

每篇文章的标题、日期、标签、封面都在 YAML front matter 里声明。这样做的好处是内容和展示完全分离，换主题不需要改任何一篇文章。

## 还没做的事

- 目录导航（TOC）
- RSS 订阅
- 全文搜索（当前只是前端过滤）
- 暗色模式

这些功能不急。先把写作习惯建立起来，功能可以慢慢加。
