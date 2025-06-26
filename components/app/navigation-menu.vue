<script setup lang="ts">
import type {
  NavigationMenuItem,
} from "@nuxt/ui";

defineProps({
  items: Array as PropType<NavigationMenuItem[] | NavigationMenuItem[][]>,
  collapsed: Boolean,
  tooltip: {
    type: Boolean,
    default: true,
  },
  popover: {
    type: Boolean,
    default: true,
  },
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
    :ui="{
      label: 'text-sm',
      link: 'text-xl',
      linkLeadingIcon: 'size-7',
    }"
  />
</template>
