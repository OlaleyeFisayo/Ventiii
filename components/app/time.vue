<script setup lang="ts">
defineProps({
  disabled: Boolean,
});

const start = defineModel("start");
const end = defineModel("end");

const error = computed(() => useTimeRangeValidator({
  start: start.value,
  end: end.value,
}));
</script>

<template>
  <div>
    <div class="flex gap-2 items-center justify-between">
      <AppInput
        v-model="start"
        type="time"
        icon="i-tabler-clock-play"
        base-class="pl-9"
        :disabled="disabled"
        :highlight="error"
        :color="error ? 'error' : 'primary'"
      />
      <AppInput
        v-model="end"
        type="time"
        icon="i-tabler-clock-stop"
        base-class="pl-9"
        :disabled="disabled"
        :highlight="error"
        :color="error ? 'error' : 'primary'"
      />
    </div>
    <p
      v-if="error"
      class="text-red-600 text-md mt-1"
    >
      End time cannot be the same as or earlier than the start time.
    </p>
  </div>
</template>
