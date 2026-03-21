<script setup lang="ts">
import type { PostSort } from "~/utils/posts";

defineProps<{
  tags: string[];
  selectedTag: string;
  sortBy: PostSort;
}>();

const emit = defineEmits<{
  "update:selectedTag": [value: string];
  "update:sortBy": [value: PostSort];
}>();
</script>

<template>
  <section class="space-y-6" aria-label="筛选与排序">
    <label class="grid gap-2 border-b border-outline pb-5">
      <span class="field-label">排序</span>
      <select
        :value="sortBy"
        class="w-full border-0 bg-transparent px-0 font-mono text-[0.8125rem] text-ink focus:outline-none"
        @change="
          emit(
            'update:sortBy',
            ($event.target as HTMLSelectElement).value as PostSort,
          )
        "
      >
        <option value="date-desc">最新优先</option>
        <option value="date-asc">最早优先</option>
        <option value="title-asc">标题 A → Z</option>
        <option value="title-desc">标题 Z → A</option>
      </select>
    </label>

    <div class="space-y-2.5">
      <p class="field-label">分类</p>

      <div class="flex flex-col items-start gap-2">
        <button
          class="chip-control"
          :class="{ 'chip-control-active': selectedTag === 'all' }"
          type="button"
          :aria-pressed="selectedTag === 'all'"
          @click="emit('update:selectedTag', 'all')"
        >
          全部
        </button>

        <button
          v-for="tag in tags"
          :key="tag"
          class="chip-control"
          :class="{ 'chip-control-active': selectedTag === tag }"
          type="button"
          :aria-pressed="selectedTag === tag"
          @click="emit('update:selectedTag', tag)"
        >
          {{ tag }}
        </button>
      </div>
    </div>
  </section>
</template>
