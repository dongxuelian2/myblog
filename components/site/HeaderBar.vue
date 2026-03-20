<script setup lang="ts">
const links = [
  { label: "首页", to: "/" },
  { label: "文章", to: "/posts" },
  { label: "关于", to: "/about" },
];
</script>

<template>
  <header
    class="sticky top-0 z-40 border-b border-outline/70 bg-paper/88 backdrop-blur-xl"
  >
    <div class="site-shell flex items-center justify-between gap-6 py-4">
      <NuxtLink to="/" class="text-ink no-underline">
        <span class="font-serif text-[1.45rem] font-medium tracking-[-0.03em]"
          >MyBlog</span
        >
      </NuxtLink>

      <div class="flex items-center gap-6">
        <nav class="flex items-center gap-6" aria-label="主导航">
          <NuxtLink
            v-for="link in links"
            :key="link.to"
            :to="link.to"
            class="nav-pill"
            active-class="nav-pill-active"
            exact-active-class="nav-pill-active"
          >
            {{ link.label }}
          </NuxtLink>
        </nav>
      </div>
    </div>
  </header>
</template>
