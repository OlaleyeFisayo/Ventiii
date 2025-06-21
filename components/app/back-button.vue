<script setup lang="ts">
defineProps({
  label: String,
});
</script>

<template>
  <div class="w-full">
    <AppButton
      :label="label ?? 'Go Back'"
      variant="link"
      class="text-black"
      icon="i-tabler-arrow-left"
      @click="$router.back"
    />
  </div>
</template>
