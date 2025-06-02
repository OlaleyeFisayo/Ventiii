<script setup lang="ts">
defineProps({
  disabled: Boolean,
});

const start = defineModel("start");
const end = defineModel("end");
</script>

<template>
  <div class="flex gap-2 items-center justify-between">
    <AppInput
      v-model="start"
      type="time"
      icon="i-tabler-clock-play"
      base-class="pl-9"
      :disabled="disabled"
    />
    <AppInput
      v-model="end"
      type="time"
      icon="i-tabler-clock-stop"
      base-class="pl-9"
      :disabled="disabled"
    />
  </div>
</template>
