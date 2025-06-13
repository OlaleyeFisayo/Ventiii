<script lang="ts" setup>
import type {
  NuxtError,
} from "#app";

const props = defineProps({
  error: Object as () => NuxtError,
});

const error: any = props.error?.statusMessage || props.error?.message || "Unknown Error Occured";
</script>

<template>
  <section class="h-[100dvh] w-full flex flex-col justify-center items-center gap-6 p-4 container mx-auto">
    <AppAlert
      color="error"
      title="Error"
      :description="error"
      icon="i-tabler-info-square-rounded-filled"
      class=""
    />
    <AppButton
      label="Go Back"
      class="w-fit"
      icon="i-tabler-arrow-narrow-left"
      to="/"
    />
  </section>
</template>
