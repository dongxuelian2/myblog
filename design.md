# Wayfinding Design System

## 目标

这套博客视觉不再是抽象的“冷调极简”，而是一套可被感知的导视系统。参考对象不是配色风格，而是东京地铁标识和 Vignelli 式信息设计方法：

- 用线、点、箭头组织阅读路径
- 用区域色而不是装饰色标记页面归属
- 用站点编号替代冗余说明
- 用统一骨架保证页面切换时的连续感

页面切换的体验目标很明确：用户不是在跳不同模板，而是在同一张线路图里移动。

## 路由区域

所有区域信息都由 [`composables/useRouteZone.ts`](/home/xia/code/myblog/composables/useRouteZone.ts) 提供，组件不能各自手写颜色和编号。

| 页面 | 区域 ID | 站点编号 | 区域色 | 含义 |
| --- | --- | --- | --- | --- |
| 首页 `/` | `H` | `H—01` | `#a23b2a` | 主线 / 枢纽 |
| 文章归档 `/posts` | `P` | `P—00` | `#3f6474` | 阅读线入口 |
| 文章详情 `/posts/[slug]` | `P` | `P—01...` | `#3f6474` | 阅读线站点 |
| 关于 `/about` | `A` | `A—01` | `#6d5c4c` | 信息线 |

编号格式统一为 `字母—两位数字`，由 `formatStationCode()` 生成。

## 色彩令牌

基础界面改为暖白纸面体系，交互只允许使用单一品牌色；导视元素允许按区域切换，但只能做弱提示。

| Token | 值 | 用途 |
| --- | --- | --- |
| `paper` | `#f6f2ec` | 页面底色 |
| `surface` | `#fffdfa` | 内容面、输入区 |
| `surface-muted` | `#efe8de` | 次级区块、占位背景 |
| `ink` | `#161311` | 主文字 |
| `ink-soft` | `#4f463f` | 正文 |
| `ink-subtle` | `#8a7f75` | 元信息 |
| `outline` | `#ddd2c5` | 分割线 |
| `accent` | `#a23b2a` | 全站唯一交互色 |
| `zone-home` | `#a23b2a` | 首页区域色 |
| `zone-posts` | `#3f6474` | 阅读线区域色 |
| `zone-about` | `#6d5c4c` | 关于页区域色 |

约束：

- 品牌色 `accent` 只负责链接、按钮、悬停、焦点、选中等交互反馈
- 区域色只出现在导视元素，不做大面积铺底，不接管普通链接和按钮
- 普通内容区统一使用中性色，避免“主题页”失控
- 组件优先消费 token 或 `--zone-color`，禁止新增临时十六进制颜色

## 导视组件

导视样式集中定义在 [`assets/css/main.css`](/home/xia/code/myblog/assets/css/main.css)。

### 1. 区域条 `.zone-stripe`

- 固定在页面左侧
- 宽度 3px
- 颜色来自 `--zone-color`
- 仅桌面端显示，移动端隐藏

### 2. 顶部信号线 `.signal-line`

- 高度 2px
- 颜色随页面区域变化
- 是全局最稳定的方向提示，不承担装饰任务

### 3. 站点编号 `.station-code`

- `JetBrains Mono`
- 左侧 4px 竖条指示器
- 用于 Header、页面标题区、归档标题区

### 4. 连接线 `.connector-line`

- 1px 垂直线
- 负责把首页和关于页的多个内容区串成一条连续路径
- 移动端缩小缩进，避免挤压正文

### 5. 节点 `.station-node`

- 7px 实心圆点
- 作为区块起点
- 通常与 `signage-header` 一起出现

### 6. 站牌标题 `.signage-header`

- 左侧细色条
- 中间为站点编号
- 右侧为区块标题
- 用于首页和关于页的章节标题

### 7. 站台导航 `.platform-nav`

- 用于文章详情页的上一篇 / 下一篇
- 使用对称双列结构
- 内部分隔线来自网格间隙和 `outline`
- 箭头、编号、标题 hover 都使用当前区域色

### 8. 导向箭头 `.guide-arrow`

- 大号箭头作为构成元素
- 用于首页末尾的“全部文章”入口
- 不是普通文本链接的替代品，而是路径延伸提示

### 9. 终点标记 `.terminal-marker`

- 表示线路结束
- 放在 Footer 顶部
- 形式为“点 + 线 + 终点文字”

### 10. 区域编号 `.index-number-zone`

- 用于归档列表中的序号
- 只改颜色，不改版式
- 让文章列表编号与阅读线区域保持一致

## 页面规则

### 首页

- Hero 保持大字“夏”，承担枢纽入口角色
- “精选”和“最近发布”使用站牌式标题
- 区块间由连接线和节点串联
- 结尾使用大号箭头导向归档页

### 文章归档

- 标题行显示 `P—00`
- 左侧筛选栏顶部加入区域色指示条
- 文章序号改为阅读线色
- 归档页不重复展示 Hero

### 文章详情

- 标题区显示当前站点编号，例如 `P—03`
- 阅读进度条跟随阅读线颜色
- 上下篇导航使用站台式布局
- 上下篇编号必须与当前文章序号保持连续关系

### 关于页

- 头部显示 `A—01`
- 各内容区继续沿用信息线编号
- 章节标题使用和首页一致的站牌结构

## 布局骨架

全站骨架保持稳定：

1. 顶部信号线
2. Header
3. 左侧区域条
4. 主内容区
5. Footer 终点标记

导视系统的重点不是“每页长得都不一样”，而是“每页共享同一张地图，只切换当前所在的线路”。

## 响应式约束

- `zone-stripe` 在移动端隐藏
- `connector-line` 和 `station-node` 缩小左侧占位
- 平台导航在窄屏下堆叠显示，但仍保留上下篇的视觉连续性
- 站点编号必须保持 `nowrap`，避免折行破坏识别

## 实施映射

| 文件 | 职责 |
| --- | --- |
| [`composables/useRouteZone.ts`](/home/xia/code/myblog/composables/useRouteZone.ts) | 路由到区域元数据的唯一来源 |
| [`layouts/default.vue`](/home/xia/code/myblog/layouts/default.vue) | 注入 `--zone-color`、渲染顶部信号线和左侧区域条 |
| [`components/site/HeaderBar.vue`](/home/xia/code/myblog/components/site/HeaderBar.vue) | 品牌旁站点编号、导航激活点 |
| [`pages/index.vue`](/home/xia/code/myblog/pages/index.vue) | 首页连接线、站牌标题、导向箭头 |
| [`components/posts/ListSection.vue`](/home/xia/code/myblog/components/posts/ListSection.vue) | 归档页标题编号和筛选栏指示 |
| [`components/posts/Card.vue`](/home/xia/code/myblog/components/posts/Card.vue) | 区域色列表序号 |
| [`pages/posts/[...slug].vue`](/home/xia/code/myblog/pages/posts/[...slug].vue) | 详情页编号、阅读进度、站台导航 |
| [`pages/about.vue`](/home/xia/code/myblog/pages/about.vue) | 信息线章节结构 |
| [`components/site/FooterBar.vue`](/home/xia/code/myblog/components/site/FooterBar.vue) | 终点标记 |

## 验证清单

1. 切换 `/`、`/posts`、文章详情、`/about` 时，顶部线和左侧竖条颜色同步变化
2. Header 中站点编号与当前路由一致
3. 归档页显示 `P—00`，详情页显示当前文章顺序编号
4. 上下篇导航编号连续，不跳号
5. 移动端没有因为连接线和编号造成正文挤压或换行错乱
