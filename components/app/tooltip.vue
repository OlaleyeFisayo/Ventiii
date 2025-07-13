<script setup lang="ts">
defineProps({
  title: String,
});
</script>

<template>
  <UTooltip :title="title">
    <slot />
  </UTooltip>
</template>
