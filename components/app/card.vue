<script setup lang="ts">
const props = defineProps({
  theme: String,
});

const isErrorTheme = computed(() => props.theme === "error");
</script>

<template>
  <UCard
    :ui="isErrorTheme ? {
      root: 'ring-red-300',
    } : {}"
  >
    <template
      v-if="$slots.header"
      #header
    >
      <slot name="header" />
    </template>
    <slot />
  </UCard>
</template>
