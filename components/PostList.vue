<script setup lang="ts">
const { data: posts } = await useAsyncData('posts', () =>
  queryCollection('posts').order('date', 'DESC').all(),
)

const searchQuery = ref('')
const selectedTag = ref('all')
const sortBy = ref('date-desc')

const allTags = computed(() => {
  const tags = posts.value?.flatMap(post => post.tags) ?? []
  return [...new Set(tags)].sort((a, b) => a.localeCompare(b, 'zh-Hans-CN'))
})

const filteredPosts = computed(() => {
  const keyword = searchQuery.value.trim().toLowerCase()

  const list = (posts.value ?? []).filter((post) => {
    const matchesTag = selectedTag.value === 'all' || post.tags.includes(selectedTag.value)
    const matchesKeyword =
      keyword.length === 0 ||
      [post.title, post.description ?? '', post.tags.join(' ')]
        .join(' ')
        .toLowerCase()
        .includes(keyword)

    return matchesTag && matchesKeyword
  })

  return [...list].sort((a, b) => {
    switch (sortBy.value) {
      case 'date-asc':
        return a.date.localeCompare(b.date)
      case 'title-asc':
        return a.title.localeCompare(b.title, 'zh-Hans-CN')
      case 'title-desc':
        return b.title.localeCompare(a.title, 'zh-Hans-CN')
      case 'date-desc':
      default:
        return b.date.localeCompare(a.date)
    }
  })
})
</script>

<template>
  <section v-if="posts?.length" class="stack-lg">
    <PostSearch v-model="searchQuery" />
    <PostFilters
      :tags="allTags"
      :selected-tag="selectedTag"
      :sort-by="sortBy"
      @update:selected-tag="selectedTag = $event"
      @update:sort-by="sortBy = $event"
    />

    <p class="results-summary">
      共 {{ filteredPosts.length }} 篇文章
    </p>

    <ul class="post-list">
      <li v-for="post in filteredPosts" :key="post.path" class="post-card">
        <p class="post-title">
          <NuxtLink :to="post.path">{{ post.title }}</NuxtLink>
        </p>
        <p v-if="post.description">{{ post.description }}</p>
        <div class="tag-list">
          <span v-for="tag in post.tags" :key="tag" class="tag-chip static">
            {{ tag }}
          </span>
        </div>
        <small v-if="post.date">{{ post.date }}</small>
      </li>
    </ul>

    <p v-if="filteredPosts.length === 0">没有匹配的文章。</p>
  </section>
  <p v-else>
    暂无文章。
  </p>
</template>
