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
  <section class="space-y-8" aria-label="文章筛选与排序">
    <div class="editorial-rule pb-4">
      <p class="text-[1.7rem] font-normal leading-none text-ink">
        Filter and sort
      </p>
    </div>

    <label class="grid gap-3 editorial-rule pb-5">
      <span class="field-label">Sort by</span>

      <select
        :value="sortBy"
        class="w-full border-0 bg-transparent px-0 text-base font-normal text-ink focus:outline-none"
        @change="
          emit(
            'update:sortBy',
            ($event.target as HTMLSelectElement).value as PostSort,
          )
        "
      >
        <option value="date-desc">Newest first</option>
        <option value="date-asc">Oldest first</option>
        <option value="title-asc">Title A-Z</option>
        <option value="title-desc">Title Z-A</option>
      </select>
    </label>

    <div class="space-y-3">
      <p class="field-label">Category</p>

      <div class="flex flex-col items-start gap-3">
        <button
          class="chip-control"
          :class="{ 'chip-control-active': selectedTag === 'all' }"
          type="button"
          :aria-pressed="selectedTag === 'all'"
          @click="emit('update:selectedTag', 'all')"
        >
          全部文章
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
