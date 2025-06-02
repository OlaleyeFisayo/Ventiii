<script lang="ts" setup>
defineProps({
  autoresize: {
    type: Boolean,
    default: true,
  },
  placeholder: String,
  disabled: Boolean,
});

const model = defineModel<any>();
</script>

<template>
  <UTextarea
    v-model="model"
    :autoresize="autoresize"
    :placeholder="placeholder"
    :disabled="disabled"
    :ui="{
      root: 'w-full',
      base: 'p-4',
    }"
  />
</template>
