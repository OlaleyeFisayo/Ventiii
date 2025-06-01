<script setup lang="ts">
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
  <section class="text-black pt-16 pb-8">
    <h1 class="text-3xl font-bold text-center">
      Sign up
    </h1>
    <section
      class="w-full max-w-[500px] mx-auto mt-4"
    >
      <AppAlert
        v-if="authStore.success"
        color="success"
        title="Success"
        description="Verify your Email before you log in"
        icon="i-tabler-info-square-rounded-filled"
        class="mb-4"
      />
      <AppForm
        v-model:items="registerForm"
        submit-label="Sign up"
        :loading="authStore.loading"
        @submit="authStore.signUp"
      />
      <AppSeperator label="or" class="my-4" />
      <AuthGoogleButton />
      <NuxtLink to="/log-in" class="underline flex items-center justify-center text-purple-900">
        Already have an account? Log in
      </NuxtLink>
    </section>
  </section>
</template>
