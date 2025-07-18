<script setup lang="ts">
import type {
  NavigationMenuItem,
} from "@nuxt/ui";

defineProps({
  items: Array as PropType<NavigationMenuItem[] | NavigationMenuItem[][]>,
  collapsed: Boolean,
  orientation: {
    type: String as PropType<"vertical" | "horizontal">,
    default: "vertical",
  },
  linkClass: String,
  linkLeadingIconClass: String,
  listClass: String,
});
</script>

<template>
  <UNavigationMenu
    :items="items"
    :collapsed="collapsed"
    :orientation="orientation"
    highlight
    variant="link"
    :ui="{
      label: 'text-sm',
      list: `${listClass}`,
      link: `text-xl ${linkClass}`,
      linkLeadingIcon: `size-7 ${linkLeadingIconClass}`,
    }"
  />
</template>
