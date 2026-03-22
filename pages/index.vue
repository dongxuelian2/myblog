<script setup lang="ts">
import type { PostItem } from "~/utils/posts";
import { resolvePostPath, sortPosts } from "~/utils/posts";

const { data: homePosts } = await useAsyncData("home-posts", async () => {
  const result = await queryCollection("posts").all();
  return sortPosts((result ?? []) as PostItem[]);
});

const assetPath = useAssetPath();

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
</script>

<template>
  <section class="mx-auto w-full max-w-layout">
    <header class="enter border-b border-outline pb-12">
      <div class="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
        <div class="max-w-[34rem]">
          <div class="flex items-center gap-3">
            <span class="station-code">H—01</span>
            <p class="eyebrow-label">首页</p>
          </div>
          <h1 class="mt-5 text-[1.75rem] font-semibold tracking-tight text-ink sm:text-[2.125rem]">
            个人博客
          </h1>
          <p class="mt-3 text-[0.98rem] leading-[1.9] text-ink-soft">
            记录产品观察、前端笔记与阅读整理，
            主要关心交互设计、信息架构和中文排版。
          </p>
          <div class="mt-7 flex flex-wrap items-center gap-5">
            <NuxtLink
              v-if="featuredPost"
              :to="resolvePostPath(featuredPost)"
              class="action-link group/link"
            >
              阅读精选
              <svg
                class="h-3.5 w-3.5 transition-transform duration-200 group-hover/link:translate-x-0.5"
                viewBox="0 0 16 16" fill="none" aria-hidden="true"
              >
                <path d="M6.5 3.5L11 8L6.5 12.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </NuxtLink>
            <NuxtLink to="/about" class="action-link">
              关于我
            </NuxtLink>
          </div>
        </div>

        <div class="enter enter-d1 home-marker">
          <img
            :src="assetPath('/images/profile/avatar.jpg')"
            alt="夏的头像"
            class="home-marker__avatar"
          />
          <div class="home-marker__copy">
            <span class="eyebrow-label">Author</span>
            <span class="home-marker__name">夏</span>
          </div>
        </div>
      </div>
    </header>

    <!-- Connected sections — the "line" -->
    <div class="connector-line mt-10">
      <!-- Featured station -->
      <section v-if="featuredPost" class="enter enter-d2">
        <div class="station-node">
          <div class="signage-header">
            <span class="signage-indicator" aria-hidden="true" />
            <span class="signage-code">H—01</span>
            <span class="signage-label">精选</span>
          </div>
        </div>

        <div class="ml-0 mt-3">
          <PostsCard :post="featuredPost" variant="feature" />
        </div>
      </section>

      <!-- Recent station -->
      <section class="enter enter-d3 mt-12">
        <div class="station-node">
          <div class="signage-header">
            <span class="signage-indicator" aria-hidden="true" />
            <span class="signage-code">H—02</span>
            <span class="signage-label">最近发布</span>
          </div>
        </div>

        <div class="mt-3">
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

          <p v-else class="py-8 text-sm text-ink-subtle">
            暂无更多文章。
          </p>
        </div>
      </section>

      <!-- Guide arrow to archive -->
      <div class="enter enter-d6 mt-10 station-node">
        <NuxtLink to="/posts" class="guide-arrow">
          <span class="guide-arrow-icon" aria-hidden="true">&rarr;</span>
          全部文章
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
