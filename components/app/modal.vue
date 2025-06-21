<script setup lang="ts">
defineProps({
  dismissible: {
    type: Boolean,
    default: true,
  },
});

const open = defineModel<boolean>("open", {
  default: false,
});
</script>

<template>
  <UModal
    v-model:open="open"
    :dismissible="dismissible"
  >
    <template
      v-if="$slots.content"
      #content
    >
      <slot name="content" />
    </template>
  </UModal>
</template>

<style scoped>
/* code... */
</style>
