<script setup lang="ts">
const year = new Date().getFullYear();
</script>

<template>
  <footer class="border-t border-outline/70 py-10">
    <div
      class="site-shell flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
    >
      <div class="space-y-2">
        <p class="font-serif text-xl text-ink">MyBlog</p>
        <p class="max-w-xl text-sm leading-7 text-ink-subtle">
          一个以中文写作、阅读与长期记录为中心的个人博客。
        </p>
      </div>

      <div class="text-sm text-ink-subtle">
        <p>{{ year }} MyBlog</p>
        <p>Nuxt Content + TailwindCSS</p>
      </div>
    </div>
  </footer>
</template>
