<script setup lang="ts">
import type { PostItem } from "~/utils/posts";
import { estimateReadingTime, formatPostDate } from "~/utils/posts";

const route = useRoute();

const { data: post } = await useAsyncData(route.path, () =>
  queryCollection("posts").path(route.path).first(),
);

const readingTime = computed(() => {
  return estimateReadingTime(post.value?.body?.value ?? post.value?.body);
});

const formattedDate = computed(() => formatPostDate(post.value?.date));

const primaryTag = computed(() => post.value?.tags?.[0] ?? "博客文章");

if (!post.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Article Not Found",
  });
}

const copied = ref(false);

async function copyLink() {
  if (!import.meta.client) {
    return;
  }

  await navigator.clipboard.writeText(window.location.href);
  copied.value = true;

  window.setTimeout(() => {
    copied.value = false;
  }, 1800);
}
</script>

<template>
  <section class="mx-auto w-full max-w-shell">
    <article class="space-y-10">
      <header
        class="grid gap-10 border-b border-outline/75 pb-8 xl:grid-cols-[minmax(0,52rem)_13.5rem] xl:items-start xl:justify-between"
      >
        <div class="max-w-[52rem]">
          <NuxtLink to="/posts" class="action-link">返回文章归档</NuxtLink>
          <div class="mt-6 space-y-5">
            <p class="eyebrow-label">{{ primaryTag }}</p>
            <h1
              class="max-w-4xl text-[3.9rem] font-medium leading-[0.98] text-ink"
            >
              {{ post?.title }}
            </h1>
            <p
              v-if="post?.description"
              class="max-w-3xl text-lg leading-9 text-ink-soft"
            >
              {{ post.description }}
            </p>
          </div>
        </div>

        <aside class="border-t border-outline/75 pt-8 xl:border-t-0 xl:pt-10">
          <div class="space-y-7">
            <section class="grid grid-cols-[1rem_1fr] gap-x-3">
              <svg
                class="mt-1 h-4 w-4 text-ink-subtle"
                viewBox="0 0 20 20"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M10 2.75a5.25 5.25 0 0 0-3.76 8.92c.52.52.89 1.17 1.07 1.88h5.38c.18-.71.55-1.36 1.07-1.88A5.25 5.25 0 0 0 10 2.75Z"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                />
                <path
                  d="M7.75 16.25h4.5M8.5 13.75h3"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-width="1.5"
                />
              </svg>

              <div class="space-y-1.5">
                <p class="text-[0.9rem] text-ink-subtle">Category</p>
                <p
                  class="text-[1.02rem] leading-7 text-ink underline decoration-outline-strong/80 underline-offset-4"
                >
                  {{ primaryTag }}
                </p>
                <div v-if="post?.tags?.length > 1" class="space-y-0.5">
                  <p
                    v-for="tag in post.tags.slice(1)"
                    :key="tag"
                    class="text-[1.02rem] leading-7 text-ink underline decoration-outline-strong/80 underline-offset-4"
                  >
                    {{ tag }}
                  </p>
                </div>
              </div>
            </section>

            <section class="grid grid-cols-[1rem_1fr] gap-x-3">
              <svg
                class="mt-1 h-4 w-4 text-ink-subtle"
                viewBox="0 0 20 20"
                fill="none"
                aria-hidden="true"
              >
                <rect
                  x="3.25"
                  y="4.25"
                  width="13.5"
                  height="12.5"
                  rx="2"
                  stroke="currentColor"
                  stroke-width="1.5"
                />
                <path
                  d="M6.5 2.75v3M13.5 2.75v3M6.5 10.25h2.5"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-width="1.5"
                />
              </svg>

              <div class="space-y-1.5">
                <p class="text-[0.9rem] text-ink-subtle">Date</p>
                <p class="text-[1.02rem] leading-7 text-ink">
                  {{ formattedDate }}
                </p>
              </div>
            </section>

            <section class="grid grid-cols-[1rem_1fr] gap-x-3">
              <svg
                class="mt-1 h-4 w-4 text-ink-subtle"
                viewBox="0 0 20 20"
                fill="none"
                aria-hidden="true"
              >
                <circle
                  cx="10"
                  cy="10"
                  r="6.75"
                  stroke="currentColor"
                  stroke-width="1.5"
                />
                <path
                  d="M10 6.5v3.75l2.25 1.5M10 2.75v1.5"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                />
              </svg>

              <div class="space-y-1.5">
                <p class="text-[0.9rem] text-ink-subtle">Reading time</p>
                <p class="text-[1.02rem] leading-7 text-ink">
                  {{ readingTime }}
                </p>
              </div>
            </section>

            <section class="grid grid-cols-[1rem_1fr] gap-x-3">
              <svg
                class="mt-1 h-4 w-4 text-ink-subtle"
                viewBox="0 0 20 20"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M7.25 12.75 12.75 7.25M8.75 5.75h4v4"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                />
                <path
                  d="M4.25 15.75v-3.5a2 2 0 0 1 2-2h3.5"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-width="1.5"
                />
              </svg>

              <div class="space-y-1.5">
                <p class="text-[0.9rem] text-ink-subtle">Share</p>
                <button
                  class="action-link text-[1.02rem]"
                  type="button"
                  @click="copyLink"
                >
                  {{ copied ? "链接已复制" : "复制链接" }}
                </button>
              </div>
            </section>
          </div>
        </aside>
      </header>

      <div class="mx-auto max-w-[52rem] space-y-10">
        <figure
          v-if="post?.cover"
          class="overflow-hidden rounded-[1.25rem] border border-outline/75 bg-white"
        >
          <img
            :src="post.cover"
            :alt="post.coverAlt || ''"
            class="aspect-[16/9] w-full object-cover"
          />
          <figcaption
            v-if="post?.coverAlt"
            class="border-t border-outline/70 px-5 py-3 text-center text-sm text-ink-subtle"
          >
            {{ post.coverAlt }}
          </figcaption>
        </figure>

        <div class="mx-auto max-w-reading">
          <div class="article-prose">
            <ContentRenderer v-if="post" :value="post" />
          </div>
        </div>
      </div>
    </article>
  </section>
</template>
