<script setup lang="ts">
definePageMeta({
  layout: "auth",
});

const authStore = useAuthStore();

const registerForm = ref<AppFormItems[]>([
  {
    tag: "name",
    type: "text",
    value: "",
  },
  {
    tag: "email",
    type: "email",
    value: "",
  },
  {
    tag: "password",
    type: "password",
    value: "",
    securePassword: true,
  },
]);
</script>

<template>
  <section class="text-black pt-8 flex flex-col justify-center h-[100dvh]">
    <h1 class="text-3xl font-bold text-center">
      Sign up
    </h1>
    <section
      class="w-full max-w-[500px] mx-auto mt-4"
    >
      <AppAlert
        v-if="authStore.success"
        color="success"
        title="Please verify your email."
        description="We’ve sent you a link — check your inbox (or spam folder) before logging in"
        icon="i-tabler-info-square-rounded-filled"
        class="mb-4"
      />
      <AppForm
        v-model:items="registerForm"
        :show-hints="false"
        submit-label="Sign up"
        :loading="authStore.loading"
        @submit="authStore.signUp"
      />
      <AppSeperator
        label="or"
        class="my-4"
      />
      <AuthGoogleButton />
      <NuxtLink
        to="/log-in"
        class="underline flex items-center justify-center text-purple-900"
      >
        Already have an account? Log in
      </NuxtLink>
    </section>
  </section>
</template>
