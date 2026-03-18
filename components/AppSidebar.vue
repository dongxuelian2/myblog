<script setup lang="ts">
const links = [
  { label: '首页', to: '/' },
  { label: '文章', to: '/posts' },
  { label: '关于', to: '/about' },
]
</script>

<template>
  <aside class="sidebar">
    <NuxtLink to="/" class="brand-link">
      MyBlog
    </NuxtLink>

    <nav class="sidebar-nav" aria-label="主导航">
      <NuxtLink
        v-for="link in links"
        :key="link.to"
        :to="link.to"
        class="sidebar-tab"
        active-class="active"
        exact-active-class="active"
      >
        {{ link.label }}
      </NuxtLink>
    </nav>
  </aside>
</template>
