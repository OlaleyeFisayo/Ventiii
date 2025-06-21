<script setup lang="ts">
// code...
</script>

<template>
  <UCard>
    <template #header>
      <slot name="header" />
    </template>
    <slot />
  </UCard>
</template>
