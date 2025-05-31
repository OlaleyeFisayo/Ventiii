<script lang="ts" setup>
defineProps({
  src: String,
  size: {
    type: String as PropType<ComponentSize>,
  },
  text: String,
  alt: String,
});
</script>

<template>
  <UAvatar
    :src="src"
    :size="size"
    :text="text"
    :alt="alt"
  />
</template>
