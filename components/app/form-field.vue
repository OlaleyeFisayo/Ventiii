<script setup lang="ts">
defineProps({
  label: String,
  name: String,
});
</script>

<template>
  <UFormField
    :label="label"
    :name="name"
    :ui="{
      label: 'capitalize text-lg text-black',
    }"
  >
    <slot />
  </UFormField>
</template>
