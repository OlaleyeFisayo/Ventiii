<script lang="ts" setup>
defineProps({
  ui: Object,
});
</script>

<template>
  <UCard :ui="ui">
    <slot />
  </UCard>
</template>
