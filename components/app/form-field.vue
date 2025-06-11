<script setup lang="ts">
defineProps({
  label: String,
  name: String,
  required: Boolean,
  optional: Boolean,
});
</script>

<template>
  <UFormField
    :label="label"
    :name="name"
    :required="required"
    :hint="optional ? 'Optional' : ''"
    :ui="{
      label: 'capitalize text-lg text-black',
    }"
  >
    <slot />
  </UFormField>
</template>
