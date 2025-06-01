<script setup lang="ts">
import type {
  DropdownMenuItem,
} from "@nuxt/ui";

defineProps({
  items: {
    type: Array as PropType<DropdownMenuItem[]>,
  },
});
</script>

<template>
  <UDropdownMenu
    :items="items"
    :content="{
      align: 'start',
    }"
    :ui="{
      item: 'text-md cursor-pointer',
    }"
  >
    <slot />
  </UDropdownMenu>
</template>
