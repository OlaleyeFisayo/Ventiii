<script setup lang="ts">
const loginForm = ref<AppFormItems[]>([
  {
    tag: "email",
    type: "email",
    value: "",
  },
  {
    tag: "password",
    type: "password",
    value: "",
  },
]);
</script>

<template>
  <section class="text-black pt-16 pb-8">
    <h1 class="text-3xl font-bold text-center">
      Welcome back
    </h1>
    <section
      class="w-full max-w-[500px] mx-auto mt-4"
    >
      <AppForm
        v-model:items="loginForm"
        submit-label="Log in"
      />
      <!-- TODO: Add Forgot password section -->
      <AppSeperator label="or" class="my-4" />
      <AppButton
        label="Continue with Google"
        class="w-full flex items-center justify-center p-3 mb-4"
        theme="secondary"
        trailing-icon="i-tabler-brand-google-filled"
      />
      <NuxtLink to="/" class="underline flex items-center justify-center text-purple-900">
        Don't have an account? Sign up
      </NuxtLink>
    </section>
  </section>
</template>
