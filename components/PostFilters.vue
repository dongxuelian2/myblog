<script setup lang="ts">
defineProps<{
  tags: string[]
  selectedTag: string
  sortBy: string
}>()

const emit = defineEmits<{
  'update:selectedTag': [value: string]
  'update:sortBy': [value: string]
}>()
</script>

<template>
  <section class="post-controls">
    <div>
      <span class="control-label">标签过滤</span>
      <div class="tag-filter-list">
        <button
          class="tag-chip"
          :class="{ active: selectedTag === 'all' }"
          type="button"
          @click="emit('update:selectedTag', 'all')"
        >
          全部
        </button>
        <button
          v-for="tag in tags"
          :key="tag"
          class="tag-chip"
          :class="{ active: selectedTag === tag }"
          type="button"
          @click="emit('update:selectedTag', tag)"
        >
          {{ tag }}
        </button>
      </div>
    </div>

    <label class="sort-box">
      <span class="control-label">排序</span>
      <select
        :value="sortBy"
        class="sort-select"
        @change="emit('update:sortBy', ($event.target as HTMLSelectElement).value)"
      >
        <option value="date-desc">日期从新到旧</option>
        <option value="date-asc">日期从旧到新</option>
        <option value="title-asc">标题 A-Z</option>
        <option value="title-desc">标题 Z-A</option>
      </select>
    </label>
  </section>
</template>
