---
title: 长文渲染压力测试
description: 一篇故意写得又长又杂的文章，用来观察博客在长文场景下的排版稳定性。
date: 2026-03-18
tags:
  - 排版
  - 测试
  - 长文
cover: /images/covers/longform-study.svg
coverAlt: 网格结构与色块对比的几何抽象封面。
featured: true
---

## 为什么需要长文测试

一个博客在短文里看起来正常，不代表它的排版是稳定的。真正容易出问题的是长文——长文会把标题间距、列表缩进、代码块溢出、引用嵌套、表格横向滚动这些潜在问题全部暴露出来。

这篇文章故意写得很长，也故意写得很杂。它的目标不是传递信息，而是作为排版系统的压力测试。

## 连续段落

第一段是开场。通常博客文章的第一段承担"钩子"功能，需要在三行以内让读者决定是否继续往下读。

第二段紧跟着出现。这里主要观察相邻段落之间的默认距离是否舒适。距离太小，段落挤在一起，辨识度下降；距离太大，页面显得松散。

第三段进一步拉长。当作者进入写作状态之后，段落长度往往会增加。这个位置容易暴露排版里的细小问题——比如段落首尾的 margin 是否一致，或者当段落中混入链接时颜色是否合理。

[这是一个测试链接](https://example.com)，它存在的意义只是确认正文里的链接样式足够清楚但不喧宾夺主。

## 列表与层级

下面是一个普通无序列表：

- 保持段落与列表之间的距离稳定。
- 保持列表项目符号与正文基线对齐。
- 保持长列表项换行后仍然易读。

下面是一个有序列表：

1. 先提出问题。
2. 再给出观察。
3. 然后解释原因。
4. 最后留下一个可以继续扩展的接口。

组合列表：

1. 页面结构
   - 左侧是导航
   - 中间是正文
   - 右侧留白
2. 内容结构
   - 标题用于定位
   - 段落用于展开
   - 代码和表格承载高密度信息
3. 阅读体验
   - 速度要平稳
   - 信息要可扫描
   - 样式不要抢戏

## 引用与长引用

> 简短引用，用来确认左侧引用线、文本缩进和上下边距是否正常。

> 更长的引用块。它包含不止一句话，更适合测试多行文本在引用容器中的表现。一个常见问题是引用块的颜色过淡，导致阅读时像背景噪音；另一个常见问题是引用边框太重，把内容压得很死。
>
> 引用内部再断一段，检查段落间距是否一致。

## 代码块

TypeScript 片段：

```ts
type ArticleMeta = {
  title: string;
  date: string;
  tags: string[];
};

function estimateReadingTime(text: string) {
  const characters = text.replace(/\s+/g, "").length;
  return Math.max(1, Math.ceil(characters / 300));
}

const meta: ArticleMeta = {
  title: "Long Markdown Test",
  date: "2026-03-18",
  tags: ["Test", "Longform"],
};

console.log(meta.title, estimateReadingTime("这是一段用于测试的文本"));
```

一行很长的命令，确认 `pre` 可以横向滚动：

```bash
curl -X POST https://example.com/api/render-preview -H "Content-Type: application/json" -d '{"article":"long-markdown-test","features":["table","quote","code","task-list"],"note":"this line is intentionally long to test overflow"}'
```

C++ 代码块：

```cpp
#include <iostream>
#include <vector>

struct Section {
    std::string title;
    int paragraphs;
};

int main() {
    std::vector<Section> sections = {
        {"intro", 3},
        {"lists", 4},
        {"quotes", 2},
        {"code", 3}
    };

    for (const auto& s : sections) {
        std::cout << s.title << ": " << s.paragraphs << std::endl;
    }
    return 0;
}
```

## 表格

| 模块     | 用途           | 内容密度 | 注意事项                     |
| -------- | -------------- | -------- | ---------------------------- |
| 首页     | 入口与精选展示 | 低       | 避免空洞                     |
| 文章列表 | 浏览与筛选     | 中       | 条件组合增多后状态容易混乱   |
| 文章详情 | 核心阅读体验   | 高       | 长文、代码块、图片都可能溢出 |

## 分隔线

有时候一篇文章写到中间需要一个停顿。

---

分隔线之后继续写。视觉上分隔线前后间距太小像普通边框，太大会打断节奏。

## 混合内容

下面把多种元素揉在一起：

- 第一项：页面宽度和信息层级比装饰更重要。
- 第二项：正文列宽固定在 44rem 可以保证每行字数稳定。
- 第三项：元数据用等宽字体显示增加技术感。

紧接着一段说明文字，观察列表结束后回到普通段落时是否有节奏断裂。

> 再插入一个引用，看看列表、段落、引用连续出现时是否还能保持顺滑。

一个短代码：`return article.rendered && layout.stable`

短表格：

| 项目     | 状态   |
| -------- | ------ |
| 正文宽度 | 稳定   |
| 长文测试 | 通过   |

## 结尾

如果你一路滚到这里，说明这篇文章足够长，可以覆盖大部分排版场景。后续如果需要继续压测，可以再加图片、脚注和超长表格。
