<script setup lang="ts">
const links = [
  { label: "首页", to: "/" },
  { label: "文章", to: "/posts" },
  { label: "关于", to: "/about" },
];
</script>

<template>
  <header
    class="sticky top-[2px] z-40 border-b border-outline bg-paper/90 backdrop-blur-md"
  >
    <div class="site-shell flex h-14 items-center justify-between">
      <NuxtLink
        to="/"
        class="group text-lg font-semibold tracking-tight text-ink no-underline"
      >
        <span class="inline-block transition-transform duration-200 group-hover:scale-105">夏</span>
      </NuxtLink>

      <nav class="flex items-center gap-7" aria-label="主导航">
        <NuxtLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="nav-link"
          active-class="nav-link-active"
          exact-active-class="nav-link-active"
        >
          {{ link.label }}
        </NuxtLink>
      </nav>
    </div>
  </header>
</template>
