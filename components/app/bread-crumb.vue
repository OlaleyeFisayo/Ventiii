<script setup lang="ts">
import type {
  BreadcrumbItem,
} from "@nuxt/ui";

defineProps ({
  items: Array as PropType<BreadcrumbItem[]>,
});
</script>

<template>
  <UBreadcrumb
    :items="items"
    :ui="{
      link: 'w-full max-w-[100px]',
    }"
  />
</template>
