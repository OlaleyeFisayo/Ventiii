<script setup lang="ts">
definePageMeta({
  layout: "auth",
});

const authStore = useAuthStore();

const forgotPasswordForm = ref<AppFormItems[]>([
  {
    tag: "email",
    type: "email",
    value: "",
  },
]);
</script>

<template>
  <section class="text-black pt-8 flex flex-col justify-center h-[100dvh]">
    <h1 class="text-3xl font-bold text-center">
      Forgot your password?
    </h1>
    <p class="w-full max-w-[500px] mx-auto text-lg mt-2 text-center">
      Enter the email address associated with your account and we will send a an otp code
    </p>
    <section
      class="w-full max-w-[500px] mx-auto mt-4"
    >
      <AppForm
        v-model:items="forgotPasswordForm"
        :show-hints="false"
        submit-label="Send OTP"
        :loading="authStore.loading"
        @submit="authStore.forgetPasswordOTP"
      />
      <NuxtLink
        to="/log-in"
        class="underline flex items-center justify-center mt-4 text-purple-900"
      >
        Remember your password?
      </NuxtLink>
    </section>
  </section>
</template>
