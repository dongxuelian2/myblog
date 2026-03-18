<script setup lang="ts">
defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<template>
  <label class="search-box">
    <span class="control-label">搜索文章</span>
    <input
      :value="modelValue"
      class="search-input"
      type="search"
      placeholder="按标题、摘要或标签搜索"
      @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    >
  </label>
</template>
