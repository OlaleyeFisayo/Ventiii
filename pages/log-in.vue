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

watch(
  () => authStore.user,
  async (newUser: any) => {
    if (newUser) {
      await navigateTo("/dashboard");
    }
  },
);
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
      >
        <div class="mt-2">
          <NuxtLink to="/forgot-password" class="underline text-purple-900">
            Forgot Password?
          </NuxtLink>
        </div>
      </AppForm>
      <AppSeperator label="or" class="my-4" />
      <AuthGoogleButton />
      <NuxtLink to="/" class="underline flex items-center justify-center text-purple-900">
        Don't have an account? Sign up
      </NuxtLink>
    </section>
  </section>
</template>
