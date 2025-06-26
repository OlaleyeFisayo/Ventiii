<script setup lang="ts">
defineProps({
  label: String,
  description: String,
  size: {
    type: String as PropType<ComponentSize>,
    default: "xl",
  },
});

const model = defineModel<boolean>({
  default: false,
});
</script>

<template>
  <USwitch
    v-model="model"
    :label="label"
    :description="description"
    :size="size"
    :ui="{
      root: 'flex items-center flex-row-reverse w-full justify-between gap-2',
      label: 'font-semibold text-lg text-black',
      description: 'text-muted text-sm',
    }"
  />
</template>
