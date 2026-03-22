<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
});

const props = defineProps<{
  src?: string;
  alt?: string;
  title?: string;
}>();

const assetPath = useAssetPath();
</script>

<template>
  <figure class="prose-media">
    <img
      v-bind="$attrs"
      :src="assetPath(props.src)"
      :alt="props.alt || ''"
      class="prose-media__image"
    />
    <figcaption v-if="props.title || props.alt" class="prose-media__caption">
      {{ props.title || props.alt }}
    </figcaption>
  </figure>
</template>
