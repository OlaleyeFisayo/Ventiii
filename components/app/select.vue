<script setup lang="ts">
defineProps({
  items: Array as PropType<string[]>,
});

const model = defineModel<string>();
</script>

<template>
  <USelect
    v-model="model"
    :items="items"
    :ui="{
      base: 'w-full',
    }"
  />
</template>
