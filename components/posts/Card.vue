<script setup lang="ts">
import type { PostItem } from "~/utils/posts";
import { formatPostDate, resolvePostPath } from "~/utils/posts";

const props = defineProps<{
  post: PostItem;
  variant?: "feature" | "list";
}>();

const placeholderStyles = [
  {
    shell: "from-sunrise-soft via-white to-sea-soft",
    orb: "bg-sunrise/25",
    line: "bg-sunrise/65",
  },
  {
    shell: "from-sea-soft via-white to-moss-soft",
    orb: "bg-sea/25",
    line: "bg-sea/60",
  },
  {
    shell: "from-moss-soft via-white to-sunrise-soft",
    orb: "bg-moss/20",
    line: "bg-moss/55",
  },
];

function hashValue(value: string) {
  return Array.from(value).reduce(
    (total, current) => total + current.charCodeAt(0),
    0,
  );
}

const visual = computed(() => {
  const seed = props.post.tags?.[0] || props.post.title || "journal";
  return placeholderStyles[hashValue(seed) % placeholderStyles.length];
});

const initials = computed(() => {
  const cleaned = props.post.title.replace(/\s+/g, "");
  return cleaned.slice(0, 2).toUpperCase();
});

const postPath = computed(() => resolvePostPath(props.post));
const metaLine = computed(() => {
  const secondary = props.post.tags.slice(
    0,
    props.variant === "feature" ? 2 : 1,
  );
  return [formatPostDate(props.post.date), ...secondary].join(" · ");
});
</script>

<template>
  <article
    :class="[
      variant === 'feature'
        ? 'grid gap-7 pb-10 editorial-rule xl:grid-cols-[minmax(16rem,26rem)_minmax(0,1fr)]'
        : 'grid gap-5 py-8 editorial-rule md:grid-cols-[11rem_minmax(0,1fr)]',
    ]"
  >
    <div
      :class="[
        'relative isolate overflow-hidden bg-surface-muted',
        visual.shell,
        variant === 'feature'
          ? 'aspect-[4/3] rounded-[1.35rem] bg-gradient-to-br'
          : 'aspect-[4/3] rounded-[1rem] bg-gradient-to-br',
      ]"
    >
      <img
        v-if="post.cover"
        :src="post.cover"
        :alt="post.coverAlt || ''"
        class="h-full w-full object-cover"
      />

      <template v-else>
        <div
          class="absolute left-8 top-8 h-24 w-24 rounded-full blur-3xl"
          :class="visual.orb"
        />
        <div
          class="absolute inset-x-5 bottom-5 space-y-4 rounded-[1.15rem] border border-white/45 bg-white/45 p-4 backdrop-blur-sm"
        >
          <div class="flex flex-wrap items-center gap-2">
            <span
              class="text-[0.72rem] uppercase tracking-[0.22em] text-ink-subtle"
            >
              {{ post.tags[0] || "Journal" }}
            </span>
          </div>

          <p class="font-serif text-3xl leading-none text-ink md:text-4xl">
            {{ initials }}
          </p>

          <div class="space-y-2">
            <div class="h-1.5 w-28 rounded-full" :class="visual.line" />
            <div class="h-1.5 w-36 rounded-full bg-white/80" />
          </div>
        </div>
      </template>
    </div>

    <div class="flex min-w-0 flex-col justify-center">
      <p class="text-sm font-normal text-ink-subtle">
        {{ metaLine }}
      </p>

      <h2
        :class="
          variant === 'feature'
            ? 'mt-4 max-w-3xl text-[2.35rem] font-medium leading-[1.08] text-ink md:text-[3rem]'
            : 'mt-3 max-w-3xl text-[1.9rem] font-medium leading-[1.14] text-ink md:text-[2.2rem]'
        "
      >
        <NuxtLink
          :to="postPath"
          class="text-ink no-underline hover:text-ink-soft"
        >
          {{ post.title }}
        </NuxtLink>
      </h2>

      <p
        :class="
          variant === 'feature'
            ? 'mt-4 max-w-2xl text-base leading-8 text-ink-soft'
            : 'mt-4 max-w-2xl text-base leading-8 text-ink-soft'
        "
      >
        {{
          post.description ||
          "这是一篇围绕中文写作、产品思考与长期记录展开的文章。"
        }}
      </p>

      <div class="mt-6">
        <NuxtLink :to="postPath" class="action-link">
          阅读全文
          <span aria-hidden="true">↗</span>
        </NuxtLink>
      </div>
    </div>
  </article>
</template>
