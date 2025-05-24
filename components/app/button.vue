<script setup lang="ts">
const props = defineProps({
  class: String,
  label: String,
  theme: String,
  to: String,
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
  >
    <slot />
  </UButton>
</template>
