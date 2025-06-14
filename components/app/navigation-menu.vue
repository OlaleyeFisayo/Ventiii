<script setup lang="ts">
import type {
  NavigationMenuItem,
} from "@nuxt/ui";

defineProps({
  items: Array as PropType<NavigationMenuItem[] | NavigationMenuItem[][]>,
  collapsed: Boolean,
  tooltip: Boolean,
  popover: Boolean,
  orientation: {
    type: String as PropType<"vertical" | "horizontal">,
    default: "vertical",
  },
});
</script>

<template>
  <UNavigationMenu
    :items="items"
    :collapsed="collapsed"
    :tooltip="tooltip"
    :popover="popover"
    :orientation="orientation"
    highlight
    variant="link"
  />
</template>
