<script lang="ts" setup>
const route = useRoute();
const error: any = route.query.error || "Unknown Error Occured";
</script>

<template>
  <section class="h-full w-full flex flex-col justify-center items-center gap-6">
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
