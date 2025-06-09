<script setup lang="ts">
const prop = defineProps({
  class: String,
});
</script>

<template>
  <USkeleton :class="prop.class" />
</template>
