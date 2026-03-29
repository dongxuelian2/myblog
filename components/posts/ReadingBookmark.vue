<script setup lang="ts">
type TocItem = { id: string; text: string; level: 2 | 3 };
type TocGroup = {
  id: string;
  text: string;
  index: number;
  children: TocItem[];
};

const props = defineProps<{
  progress: number;
  progressPercent: string;
  items: TocItem[];
  activeId: string;
}>();

const emit = defineEmits<{
  jump: [id: string];
}>();

const previewGroupId = ref("");

const groups = computed<TocGroup[]>(() => {
  const grouped: TocGroup[] = [];
  let currentGroup: TocGroup | null = null;

  props.items.forEach((item) => {
    if (item.level === 2 || !currentGroup) {
      currentGroup = {
        id: item.id,
        text: item.text,
        index: grouped.length + 1,
        children: [],
      };
      grouped.push(currentGroup);
      return;
    }

    currentGroup.children.push(item);
  });

  return grouped;
});

const activeGroupId = computed(() => {
  const currentGroup = groups.value.find(
    (group) =>
      group.id === props.activeId ||
      group.children.some((child) => child.id === props.activeId),
  );

  return currentGroup?.id ?? groups.value[0]?.id ?? "";
});

const expandedGroupId = computed(() => {
  if (
    previewGroupId.value &&
    groups.value.some((group) => group.id === previewGroupId.value)
  ) {
    return previewGroupId.value;
  }

  return activeGroupId.value;
});

watch(
  groups,
  (nextGroups) => {
    if (!nextGroups.some((group) => group.id === previewGroupId.value)) {
      previewGroupId.value = "";
    }
  },
  { immediate: true },
);

function toggleGroup(id: string) {
  previewGroupId.value = previewGroupId.value === id ? "" : id;
}

function formatGroupIndex(index: number) {
  return String(index).padStart(2, "0");
}
</script>

<template>
  <section class="post-bookmark" aria-label="文章书签">
    <div class="post-bookmark__section post-bookmark__section--progress">
      <div class="post-bookmark__section-head">
        <p class="eyebrow-label">阅读进度</p>
        <span class="meta-mono">Live</span>
      </div>

      <div class="post-bookmark__progress">
        <div class="post-bookmark__progress-copy">
          <span class="post-bookmark__percent">{{ progressPercent }}</span>
          <span class="meta-mono">滚动位置</span>
        </div>

        <div class="post-bookmark__meter" aria-hidden="true">
          <span :style="{ transform: `scaleY(${progress})` }" />
        </div>
      </div>
    </div>

    <div
      v-if="groups.length"
      class="post-bookmark__section post-bookmark__section--nav"
    >
      <div class="post-bookmark__section-head">
        <p class="eyebrow-label">章节书签</p>
        <span class="meta-mono">{{ groups.length }} 章</span>
      </div>

      <ol class="post-bookmark__groups">
        <li
          v-for="group in groups"
          :key="group.id"
          class="post-bookmark__group"
          :class="{
            'post-bookmark__group--active': activeGroupId === group.id,
            'post-bookmark__group--expanded': expandedGroupId === group.id,
          }"
        >
          <div class="post-bookmark__group-row">
            <button
              type="button"
              class="post-bookmark__group-button"
              :class="{
                'post-bookmark__group-button--active':
                  activeGroupId === group.id,
              }"
              :aria-current="
                activeGroupId === group.id ? 'location' : undefined
              "
              :title="group.text"
              @click="emit('jump', group.id)"
            >
              <span class="post-bookmark__group-index">{{
                formatGroupIndex(group.index)
              }}</span>
              <span class="post-bookmark__group-node" aria-hidden="true" />
              <span class="post-bookmark__group-copy">
                <span class="post-bookmark__group-title">{{ group.text }}</span>
                <span class="post-bookmark__group-meta">
                  {{
                    group.children.length
                      ? `${group.children.length} 个小节`
                      : "单节"
                  }}
                </span>
              </span>
            </button>

            <button
              v-if="group.children.length"
              type="button"
              class="post-bookmark__toggle"
              :class="{
                'post-bookmark__toggle--open': expandedGroupId === group.id,
              }"
              :aria-expanded="expandedGroupId === group.id"
              :aria-controls="`bookmark-group-${group.id}`"
              :title="expandedGroupId === group.id ? '收起小节' : '展开小节'"
              @click="toggleGroup(group.id)"
            >
              <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path
                  d="M5 6.5L8 9.5L11 6.5"
                  stroke="currentColor"
                  stroke-width="1.3"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </div>

          <div
            v-if="group.children.length"
            :id="`bookmark-group-${group.id}`"
            class="post-bookmark__children-shell"
            :class="{
              'post-bookmark__children-shell--open':
                expandedGroupId === group.id,
            }"
          >
            <ol class="post-bookmark__children">
              <li
                v-for="child in group.children"
                :key="child.id"
                class="post-bookmark__child"
              >
                <button
                  type="button"
                  class="post-bookmark__child-button"
                  :class="{
                    'post-bookmark__child-button--active':
                      activeId === child.id,
                  }"
                  :aria-current="activeId === child.id ? 'location' : undefined"
                  :title="child.text"
                  @click="emit('jump', child.id)"
                >
                  <span class="post-bookmark__child-node" aria-hidden="true" />
                  <span class="post-bookmark__child-text">{{
                    child.text
                  }}</span>
                </button>
              </li>
            </ol>
          </div>
        </li>
      </ol>
    </div>

    <NuxtLink to="/posts" class="post-bookmark__back"> 返回阅读线 </NuxtLink>
  </section>
</template>

<style scoped>
.post-bookmark {
  display: grid;
  grid-template-rows: auto minmax(0, 1fr) auto;
  gap: 1.35rem;
  width: min(100%, 14.75rem);
  max-height: calc(100vh - 8rem);
}

.post-bookmark__section {
  display: grid;
  gap: 0.9rem;
  padding-top: 0.9rem;
  border-top: 1px solid rgba(var(--outline-rgb) / 0.94);
  min-height: 0;
}

.post-bookmark__section-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 0.75rem;
}

.post-bookmark__progress {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: start;
  gap: 1rem;
}

.post-bookmark__progress-copy {
  display: grid;
  gap: 0.4rem;
}

.post-bookmark__percent {
  color: var(--zone-color);
  font-family: "JetBrains Mono", monospace;
  font-size: 1.75rem;
  line-height: 1;
  letter-spacing: -0.04em;
}

.post-bookmark__meter {
  position: relative;
  width: 0.32rem;
  height: 4.75rem;
  justify-self: end;
  border-radius: 9999px;
  overflow: hidden;
  background: rgba(var(--ink-rgb) / 0.07);
}

.post-bookmark__meter span {
  position: absolute;
  inset: 0;
  transform-origin: bottom;
  background: var(--zone-color);
}

.post-bookmark__section--nav {
  grid-template-rows: auto minmax(0, 1fr);
}

.post-bookmark__groups {
  position: relative;
  display: grid;
  gap: 0.55rem;
  min-height: 0;
  overflow-y: auto;
  padding-right: 0.35rem;
  scrollbar-width: thin;
  scrollbar-color: rgba(var(--ink-rgb) / 0.16) transparent;
}

.post-bookmark__groups::before {
  content: "";
  position: absolute;
  top: 0.35rem;
  bottom: 0.35rem;
  left: 2.05rem;
  width: 1px;
  background: linear-gradient(
    to bottom,
    color-mix(in srgb, var(--zone-color) 22%, white),
    rgba(var(--outline-rgb) / 0.94)
  );
}

.post-bookmark__group {
  position: relative;
}

.post-bookmark__group-row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 0.55rem;
  align-items: start;
}

.post-bookmark__group-button {
  position: relative;
  display: grid;
  grid-template-columns: 1.5rem 1rem minmax(0, 1fr);
  gap: 0.65rem;
  width: 100%;
  align-items: start;
  padding: 0.1rem 0;
  text-align: left;
  color: rgb(var(--ink-soft-rgb));
}

.post-bookmark__group-button:hover,
.post-bookmark__child-button:hover {
  color: rgb(var(--ink-rgb));
}

.post-bookmark__group-button--active,
.post-bookmark__child-button--active {
  color: rgb(var(--ink-rgb));
}

.post-bookmark__group-index {
  padding-top: 0.16rem;
  font-family: "JetBrains Mono", monospace;
  font-size: 0.68rem;
  line-height: 1;
  letter-spacing: 0.12em;
  color: rgb(var(--ink-subtle-rgb));
}

.post-bookmark__group-node {
  width: 0.72rem;
  height: 0.72rem;
  margin-top: 0.26rem;
  border-radius: 9999px;
  border: 1px solid color-mix(in srgb, var(--zone-color) 38%, white);
  background: rgb(var(--paper-rgb));
  box-shadow: 0 0 0 0.25rem rgb(var(--paper-rgb));
}

.post-bookmark__group-copy {
  display: grid;
  gap: 0.22rem;
  min-width: 0;
}

.post-bookmark__group-title,
.post-bookmark__child-text {
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-wrap: pretty;
}

.post-bookmark__group-title {
  font-size: 0.92rem;
  line-height: 1.6;
}

.post-bookmark__group-meta {
  font-family: "JetBrains Mono", monospace;
  font-size: 0.66rem;
  line-height: 1.2;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgb(var(--ink-subtle-rgb));
}

.post-bookmark__group--active .post-bookmark__group-node,
.post-bookmark__child-button--active .post-bookmark__child-node {
  border-color: var(--zone-color);
  background: var(--zone-color);
}

.post-bookmark__group--active .post-bookmark__group-index,
.post-bookmark__group--active .post-bookmark__group-meta,
.post-bookmark__child-button--active .post-bookmark__child-text {
  color: var(--zone-color);
}

.post-bookmark__toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.65rem;
  height: 1.65rem;
  margin-top: 0.05rem;
  border: 1px solid rgba(var(--outline-rgb) / 0.94);
  border-radius: 9999px;
  color: rgb(var(--ink-subtle-rgb));
  background: rgba(var(--surface-rgb) / 0.82);
  backdrop-filter: blur(8px);
}

.post-bookmark__toggle:hover,
.post-bookmark__toggle--open {
  color: var(--zone-color);
  border-color: color-mix(in srgb, var(--zone-color) 30%, white);
}

.post-bookmark__toggle svg {
  width: 0.75rem;
  height: 0.75rem;
  transition: transform 0.2s ease;
}

.post-bookmark__toggle--open svg {
  transform: rotate(180deg);
}

.post-bookmark__children-shell {
  display: grid;
  grid-template-rows: 0fr;
  opacity: 0;
  transition:
    grid-template-rows 0.22s ease,
    opacity 0.22s ease;
}

.post-bookmark__children-shell--open {
  grid-template-rows: 1fr;
  opacity: 1;
}

.post-bookmark__children {
  min-height: 0;
  overflow: hidden;
  display: grid;
  gap: 0.3rem;
  margin-top: 0.35rem;
  margin-left: 2.95rem;
  padding-left: 1rem;
  border-left: 1px solid rgba(var(--outline-rgb) / 0.94);
}

.post-bookmark__child-button {
  display: grid;
  grid-template-columns: 0.7rem minmax(0, 1fr);
  gap: 0.65rem;
  width: 100%;
  align-items: start;
  text-align: left;
  color: rgb(var(--ink-soft-rgb));
}

.post-bookmark__child-node {
  width: 0.42rem;
  height: 0.42rem;
  margin-top: 0.52rem;
  border-radius: 9999px;
  border: 1px solid rgba(var(--outline-strong-rgb) / 0.92);
  background: rgb(var(--paper-rgb));
}

.post-bookmark__child-text {
  font-size: 0.84rem;
  line-height: 1.65;
}

.post-bookmark__back {
  display: inline-flex;
  align-items: center;
  gap: 0.7rem;
  color: rgb(var(--ink-subtle-rgb));
  font-family: "JetBrains Mono", monospace;
  font-size: 0.72rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.post-bookmark__back::after {
  content: "";
  width: 1.4rem;
  height: 1px;
  background: var(--zone-color);
  opacity: 0.45;
}

.post-bookmark__back:hover {
  color: rgb(var(--ink-rgb));
}

@media (max-width: 1279px) {
  .post-bookmark {
    width: 100%;
    max-height: none;
  }

  .post-bookmark__section--nav {
    max-height: 18rem;
  }
}
</style>
