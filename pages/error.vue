<script lang="ts" setup>
const route = useRoute();
const error = route.query.error || "Unknown Error Occured";
</script>

<template>
  <section class="h-full flex flex-col justify-center items-center gap-6">
    <p class="bg-red-600 w-fit p-3 rounded text-white text-2xl mt-8">
      {{ error }}
    </p>
    <AppButton
      label="Go Back"
      class="w-fit"
      icon="i-tabler-arrow-narrow-left"
      @click="$router.back()"
    />
  </section>
</template>
