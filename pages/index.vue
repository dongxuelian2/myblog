<script setup lang="ts">
import type { PostItem } from "~/utils/posts";
import { resolvePostPath, sortPosts } from "~/utils/posts";

const notes = [
  {
    title: "版式先于装饰",
    body: "统一容器宽度、标题层级、段落呼吸感和模块间距，让页面即使没有复杂视觉元素，也能保持秩序感。",
  },
  {
    title: "卡片是一套系统",
    body: "列表只保留一种标准卡片和一种精选卡片，按钮、标签、图片比例和 hover 反馈都通过同一套规则收束。",
  },
  {
    title: "长文必须稳定",
    body: "文章页以阅读为中心，导语、封面、正文、文末导航的关系固定，不再让边栏和花哨组件打断阅读流。",
  },
];

const { data: homePosts } = await useAsyncData("home-posts", async () => {
  const result = await queryCollection("posts").all();
  return sortPosts((result ?? []) as PostItem[]);
});

const posts = computed(() => homePosts.value ?? []);
const featuredPost = computed(
  () => posts.value.find((post) => post.featured) ?? posts.value[0] ?? null,
);
const recentPosts = computed(() => {
  const currentPath = featuredPost.value
    ? resolvePostPath(featuredPost.value)
    : "";
  return posts.value
    .filter((post) => resolvePostPath(post) !== currentPath)
    .slice(0, 4);
});
</script>

<template>
  <section class="mx-auto w-full max-w-layout space-y-16">
    <div
      class="grid gap-10 border-b border-outline/75 pb-12 lg:grid-cols-[minmax(0,1fr)_18rem]"
    >
      <div class="space-y-5">
        <p class="eyebrow-label">Journal</p>
        <h1
          class="max-w-4xl text-[3.65rem] font-medium leading-[0.98] text-ink"
        >
          一个更接近书页而不是组件画廊的博客
        </h1>
        <p class="max-w-2xl text-lg leading-9 text-ink-soft">
          这里主要放长期写作、产品观察与阅读笔记。页面应该退后，文字应该往前，视觉秩序应该帮助阅读，而不是抢走注意力。
        </p>
      </div>

      <div class="space-y-6 text-sm leading-8 text-ink-subtle">
        <p v-for="note in notes" :key="note.title">
          <span class="block text-ink">{{ note.title }}</span>
          {{ note.body }}
        </p>
      </div>
    </div>

    <section v-if="featuredPost" class="space-y-4">
      <p class="eyebrow-label">Featured</p>
      <PostsCard :post="featuredPost" variant="feature" />
    </section>

    <section class="space-y-6">
      <div
        class="grid gap-4 border-b border-outline/75 pb-6 md:grid-cols-[12rem_minmax(0,1fr)]"
      >
        <p class="eyebrow-label">Recent</p>
        <div class="flex items-end justify-between gap-6">
          <h2 class="text-[2.15rem] font-medium leading-none text-ink">
            最近更新
          </h2>
          <NuxtLink to="/posts" class="action-link">查看全部文章</NuxtLink>
        </div>
      </div>

      <div v-if="recentPosts.length" class="divide-y divide-outline/75">
        <PostsCard
          v-for="post in recentPosts"
          :key="resolvePostPath(post)"
          :post="post"
          variant="list"
        />
      </div>

      <div
        v-else
        class="border-b border-outline/75 py-8 text-base leading-8 text-ink-subtle"
      >
        当前还没有更多文章，后续新增 Markdown 文件后会自动出现在这里。
      </div>
    </section>
  </section>
</template>
