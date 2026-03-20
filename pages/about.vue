<script setup lang="ts">
const sections = [
  {
    title: "写作对象",
    body: "这个博客主要容纳中文长文、短笔记、产品观察和阅读记录。它不追求像产品官网那样把每一个模块都包装成视觉卖点，更希望像一本缓慢更新的笔记册。",
  },
  {
    title: "页面态度",
    body: "页面应该把路径交代清楚，但不需要不停解释自己。导航、筛选、按钮、边界和动效都应该克制，真正被读者看到的应该是标题、摘要和正文。",
  },
  {
    title: "更新方式",
    body: "所有内容都来自 content 目录下的 Markdown。新增文章时，只需要补好标题、摘要、日期、标签和封面，站点会沿用同一套版式继续生长。",
  },
];
</script>

<template>
  <article class="mx-auto w-full max-w-reading space-y-10">
    <header class="border-b border-outline/75 pb-8">
      <p class="eyebrow-label">About</p>
      <h1 class="mt-4 text-[3.35rem] font-medium leading-[1.02] text-ink">
        关于这个博客
      </h1>
      <p class="mt-5 text-lg leading-9 text-ink-soft">
        这是一个以写作和阅读为中心的个人博客。它应该像一本持续增补的册子，而不是一个不断向读者推销版式存在感的模板。
      </p>
    </header>

    <section class="space-y-8">
      <div
        v-for="section in sections"
        :key="section.title"
        class="border-b border-outline/75 pb-8"
      >
        <h2 class="text-[2rem] font-medium leading-tight text-ink">
          {{ section.title }}
        </h2>
        <p class="mt-4 text-base leading-8 text-ink-soft">
          {{ section.body }}
        </p>
      </div>
    </section>
  </article>
</template>
