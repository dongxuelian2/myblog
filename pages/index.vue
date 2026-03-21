<script setup lang="ts">
import type { PostItem } from "~/utils/posts";
import { resolvePostPath, sortPosts, formatPostDate } from "~/utils/posts";

const { data: homePosts } = await useAsyncData("home-posts", async () => {
  const result = await queryCollection("posts").all();
  return sortPosts((result ?? []) as PostItem[]);
});

const posts = computed(() => homePosts.value ?? []);

const featuredPost = computed(
  () => posts.value.find((post) => post.featured) ?? posts.value[0] ?? null,
);

const recentPosts = computed(() => {
  const featuredPath = featuredPost.value
    ? resolvePostPath(featuredPost.value)
    : "";
  return posts.value
    .filter((post) => resolvePostPath(post) !== featuredPath)
    .slice(0, 6);
});

function padIndex(n: number) {
  return String(n).padStart(2, "0");
}
</script>

<template>
  <section class="mx-auto w-full max-w-layout">
    <!-- Hero — oversized brand mark as visual anchor -->
    <header class="enter border-b border-outline pb-12">
      <div class="grid items-end gap-6 lg:grid-cols-[auto_minmax(0,1fr)]">
        <h1
          class="text-[7rem] font-semibold leading-[0.85] tracking-[-0.04em] text-ink sm:text-[9rem] lg:text-[11rem]"
        >
          夏
        </h1>

        <div class="enter enter-d1 pb-2 lg:max-w-sm">
          <p class="eyebrow-label">个人博客</p>
          <p class="mt-3 text-[0.9375rem] leading-relaxed text-ink-soft">
            产品观察、技术笔记与阅读记录。<br class="hidden sm:inline" />
            关注交互设计、前端工程和信息架构。
          </p>
        </div>
      </div>
    </header>

    <!-- Featured -->
    <section v-if="featuredPost" class="enter enter-d2 mt-10">
      <div class="flex items-baseline gap-3">
        <span class="index-number">01</span>
        <span class="eyebrow-label">精选</span>
      </div>
      <PostsCard :post="featuredPost" variant="feature" class="mt-3" />
    </section>

    <!-- Recent -->
    <section class="enter enter-d3 mt-14">
      <div class="flex items-baseline justify-between border-b border-outline pb-3">
        <div class="flex items-baseline gap-3">
          <span class="index-number">02</span>
          <span class="eyebrow-label">最近发布</span>
        </div>
        <NuxtLink to="/posts" class="action-link">
          全部文章
          <svg class="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M6.5 3.5L11 8L6.5 12.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </NuxtLink>
      </div>

      <div v-if="recentPosts.length">
        <PostsCard
          v-for="(post, i) in recentPosts"
          :key="resolvePostPath(post)"
          :post="post"
          :index="i + 1"
          variant="list"
          class="enter"
          :class="`enter-d${Math.min(i + 4, 6)}`"
        />
      </div>

      <p
        v-else
        class="py-8 text-sm text-ink-subtle"
      >
        暂无更多文章。
      </p>
    </section>
  </section>
</template>
