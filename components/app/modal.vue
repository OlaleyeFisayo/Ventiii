<script setup lang="ts">
defineProps({
  dismissible: {
    type: Boolean,
    default: true,
  },
  title: String,
});

const open = defineModel<boolean>(
  "open",
  {
    default: false,
  },
);
</script>

<template>
  <UModal
    v-model:open="open"
    :dismissible="dismissible"
    :title="title"
  >
    <template
      v-if="$slots.content"
      #content
    >
      <slot name="content" />
    </template>
    <template
      v-if="$slots.body"
      #body
    >
      <slot name="body" />
    </template>
  </UModal>
</template>
