<script setup lang="ts">
defineProps<{
  eyebrow: string;
  title: string;
  description: string;
  meta?: string[];
}>();
</script>

<template>
  <section
    class="grid gap-8 border-b border-outline/70 pb-12 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end"
  >
    <div class="space-y-5">
      <p class="eyebrow-label">
        {{ eyebrow }}
      </p>

      <div class="max-w-4xl space-y-4">
        <h1
          class="max-w-4xl text-4xl leading-[1.06] text-ink md:text-5xl xl:text-[3.6rem]"
        >
          {{ title }}
        </h1>
        <p class="max-w-2xl text-base leading-8 text-ink-soft md:text-lg">
          {{ description }}
        </p>
      </div>

      <div v-if="meta?.length" class="flex flex-wrap gap-2.5">
        <span v-for="item in meta" :key="item" class="meta-pill">
          {{ item }}
        </span>
      </div>
    </div>

    <div v-if="$slots.actions" class="lg:justify-self-end">
      <slot name="actions" />
    </div>
  </section>
</template>
