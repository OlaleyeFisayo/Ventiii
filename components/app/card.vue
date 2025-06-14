<script lang="ts" setup>
defineProps({
  ui: Object,
});
</script>

<template>
  <UCard :ui="ui">
    <template
      #header
    >
      <slot name="header" />
    </template>
    <slot />
  </UCard>
</template>
