<script setup lang="ts">
import type {
  TabsItem,
} from "@nuxt/ui";

const props = defineProps({
  items: {
    type: Array as PropType<TabsItem[]>,
  },
  variant: {
    type: String as PropType<"pill" | "link">,
    default: "link",
  },
  class: String,
  content: Boolean,
  size: {
    type: String as PropType<ComponentSize>,
  },
});
</script>

<template>
  <UTabs
    class="w-full"
    :items="items"
    :class="props.class"
    :variant="variant"
    :content="content"
    :size="size"
    :ui="{
      label: 'font-semibold',
    }"
  >
    <slot />
  </UTabs>
</template>
