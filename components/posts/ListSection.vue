<script setup lang="ts">
import type { PostItem, PostSort } from "~/utils/posts";
import { resolvePostPath } from "~/utils/posts";

const props = defineProps<{
  posts: PostItem[];
  tags: string[];
  searchQuery: string;
  selectedTag: string;
  sortBy: PostSort;
}>();

const emit = defineEmits<{
  "update:searchQuery": [value: string];
  "update:selectedTag": [value: string];
  "update:sortBy": [value: PostSort];
}>();

const featuredPost = computed(
  () => props.posts.find((post) => post.featured) ?? props.posts[0] ?? null,
);

const standardPosts = computed(() => {
  const highlightedPath = featuredPost.value
    ? resolvePostPath(featuredPost.value)
    : "";
  return props.posts.filter(
    (post) => resolvePostPath(post) !== highlightedPath,
  );
});
</script>

<template>
  <section
    class="grid gap-12 lg:grid-cols-[13.5rem_minmax(0,1fr)] xl:grid-cols-[15rem_minmax(0,1fr)]"
    aria-label="文章列表"
  >
    <aside class="lg:sticky lg:top-28 lg:self-start">
      <PostsFilterBar
        :tags="tags"
        :selected-tag="selectedTag"
        :sort-by="sortBy"
        @update:selected-tag="emit('update:selectedTag', $event)"
        @update:sort-by="emit('update:sortBy', $event)"
      />
    </aside>

    <div class="space-y-10">
      <div
        class="grid gap-6 border-b border-outline/75 pb-8 xl:grid-cols-[minmax(0,1fr)_minmax(18rem,26rem)] xl:items-end"
      >
        <div class="space-y-4">
          <p class="eyebrow-label">Archive</p>
          <h1 class="max-w-4xl text-[3rem] font-medium leading-[1.02] text-ink">
            写作、思考与长期笔记
          </h1>
          <p class="max-w-2xl text-base leading-8 text-ink-soft">
            这里保留一个清晰的筛选侧栏和一组安静的文章条目。重点不是让每篇文章像产品卡片那样跳出来，而是让阅读路径自然成立。
          </p>
        </div>

        <div class="w-full max-w-md xl:justify-self-end">
          <PostsSearchField
            :model-value="searchQuery"
            @update:model-value="emit('update:searchQuery', $event)"
          />
        </div>
      </div>

      <PostsCard v-if="featuredPost" :post="featuredPost" variant="feature" />

      <div v-if="standardPosts.length" class="divide-y divide-outline/75">
        <PostsCard
          v-for="post in standardPosts"
          :key="resolvePostPath(post)"
          :post="post"
          variant="list"
        />
      </div>

      <div
        v-else
        class="border-b border-outline/75 py-8 text-base leading-8 text-ink-subtle"
      >
        没有找到匹配的文章。可以清空搜索词，或者切回“全部”标签。
      </div>
    </div>
  </section>
</template>
