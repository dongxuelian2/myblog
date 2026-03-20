<script setup lang="ts">
defineProps<{
  modelValue: string;
}>();

const emit = defineEmits<{
  "update:modelValue": [value: string];
}>();
</script>

<template>
  <label class="grid gap-3">
    <span class="input-shell">
      <svg
        class="h-4 w-4 text-ink-subtle"
        viewBox="0 0 20 20"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M13.75 13.75L17 17M15.5 9.25A6.25 6.25 0 1 1 3 9.25a6.25 6.25 0 0 1 12.5 0Z"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.5"
        />
      </svg>

      <input
        :value="modelValue"
        class="w-full border-0 bg-transparent p-0 text-base font-normal text-ink placeholder:text-ink-subtle focus:outline-none"
        type="search"
        placeholder="Search posts"
        aria-label="搜索文章"
        autocomplete="off"
        @input="
          emit('update:modelValue', ($event.target as HTMLInputElement).value)
        "
      />
    </span>
  </label>
</template>
