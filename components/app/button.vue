<script setup lang="ts">
const props = defineProps({
  class: String,
  label: String,
  theme: String,
  to: String,
  variant: String,
  icon: String,
  size: String,
  disabled: Boolean,
});
</script>

<template>
  <UButton
    class="cursor-pointer"
    :class="[
      props.class,
      theme === 'secondary' ? 'bg-slate-200 text-black hover:bg-slate-100' : '',
    ]"
    :label="label"
    :to="to"
    :variant="variant"
    :icon="icon"
    :size="size"
    :disabled="disabled"
  >
    <slot />
  </UButton>
</template>
