<script setup lang="ts">
const prop = defineprop({
  class: String,
});
</script>

<template>
  <USkeleton :class="prop.class" />
</template>
