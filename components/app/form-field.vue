<script setup lang="ts">
defineProps({
  label: String,
  name: String,
});
</script>

<template>
  <UFormField
    :label="label" :name="name" :ui="{
      label: 'capitalise text-xl text-black',
    }"
  >
    <slot />
  </UFormField>
</template>
