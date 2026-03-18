<script setup lang="ts">
const route = useRoute()

const { data: post } = await useAsyncData(route.path, () =>
  queryCollection('posts').path(route.path).first(),
)

function collectText(node: unknown): string {
  if (typeof node === 'string') {
    return node
  }

  if (Array.isArray(node)) {
    return node.map(item => collectText(item)).join(' ')
  }

  if (!node || typeof node !== 'object') {
    return ''
  }

  const current = node as {
    value?: unknown
    children?: unknown[]
    props?: Record<string, unknown>
    type?: unknown
  }

  return [
    collectText(current.value),
    collectText(current.children),
    collectText(current.props),
    typeof current.type === 'string' ? current.type : '',
  ]
    .filter(Boolean)
    .join(' ')
}

const readingTime = computed(() => {
  const text = collectText(post.value?.body?.value ?? post.value?.body)
  const characterCount = text.replace(/\s+/g, '').length

  if (characterCount === 0) {
    return '1 分钟'
  }

  return `${Math.max(1, Math.ceil(characterCount / 300))} 分钟`
})

if (!post.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Article Not Found',
  })
}
</script>

<template>
  <section class="page-section stack-lg">
    <p>
      <NuxtLink to="/posts">返回文章列表</NuxtLink>
    </p>

    <article class="article-layout">
      <div class="article-main stack-lg">
        <header class="stack-lg">
          <h1>{{ post?.title }}</h1>
          <p v-if="post?.description">{{ post.description }}</p>
        </header>
        <ContentRenderer v-if="post" :value="post" />
      </div>

      <aside class="article-meta">
        <section class="meta-block">
          <p class="meta-label">时期</p>
          <p class="meta-value">{{ post?.date }}</p>
        </section>

        <section class="meta-block">
          <p class="meta-label">预计阅读时间</p>
          <p class="meta-value">{{ readingTime }}</p>
        </section>

        <section v-if="post?.tags?.length" class="meta-block">
          <p class="meta-label">标签</p>
          <div class="meta-tags">
            <p v-for="tag in post.tags" :key="tag" class="meta-tag">
              {{ tag }}
            </p>
          </div>
        </section>
      </aside>
    </article>
  </section>
</template>
