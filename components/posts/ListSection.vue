<script setup lang="ts">
import type { PostItem, PostSort } from "~/utils/posts";
import { resolvePostPath } from "~/utils/posts";

defineProps<{
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
</script>

<template>
  <section
    class="grid gap-10 lg:grid-cols-[13rem_minmax(0,1fr)]"
    aria-label="文章列表"
  >
    <aside class="enter lg:sticky lg:top-24 lg:self-start">
      <PostsFilterBar
        :tags="tags"
        :selected-tag="selectedTag"
        :sort-by="sortBy"
        @update:selected-tag="emit('update:selectedTag', $event)"
        @update:sort-by="emit('update:sortBy', $event)"
      />
    </aside>

    <div>
      <div class="enter enter-d1 flex items-center justify-between gap-4 border-b border-outline pb-4">
        <h1 class="text-xl font-semibold tracking-tight text-ink">
          全部文章
        </h1>
        <div class="w-full max-w-[16rem]">
          <PostsSearchField
            :model-value="searchQuery"
            @update:model-value="emit('update:searchQuery', $event)"
          />
        </div>
      </div>

      <div v-if="posts.length">
        <PostsCard
          v-for="(post, i) in posts"
          :key="resolvePostPath(post)"
          :post="post"
          :index="i + 1"
          variant="list"
          class="enter"
          :class="`enter-d${Math.min(i + 2, 6)}`"
        />
      </div>

      <p
        v-else
        class="py-12 text-center text-sm text-ink-subtle"
      >
        没有找到匹配的文章。
      </p>
    </div>
  </section>
</template>
