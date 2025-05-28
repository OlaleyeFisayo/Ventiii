<script setup lang="ts">
const authStore = useAuthStore();

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
        :loading="authStore.loading"
        @submit="authStore.signIn"
      />
      <!-- TODO: Add Forgot password section -->
      <AppSeperator label="or" class="my-4" />
      <AuthGoogleButton />
      <NuxtLink to="/" class="underline flex items-center justify-center text-purple-900">
        Don't have an account? Sign up
      </NuxtLink>
    </section>
  </section>
</template>
