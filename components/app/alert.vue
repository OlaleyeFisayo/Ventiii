<script lang="ts" setup>
const props = defineProps({
  class: String,
  color: {
    type: String as PropType<ComponentColor>,
  },
  title: String,
  description: String,
  icon: String,
});
</script>

<template>
  <UAlert
    :class="props.class"
    :color="color"
    :title="title"
    :description="description"
    :icon="icon"
    :ui="{
      title: 'text-lg',
      description: 'text-md',
      icon: 'size-9',
    }"
  />
</template>
