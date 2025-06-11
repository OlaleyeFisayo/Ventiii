<script setup lang="ts">
const authStore = useAuthStore();

const resetPasswordForm = ref<AppFormItems[]>([
  {
    label: "Enter OTP",
    tag: "otp",
    type: "otp",
    value: [],
  },
  {
    label: "New Password",
    tag: "password",
    type: "password",
    value: "",
    securePassword: true,
    placeholder: "New Password",
  },
  {
    label: "Confirm New Password",
    tag: "confirmPassword",
    type: "password",
    value: "",
    placeholder: "Confirm New Password",
  },
]);

const route = useRoute();

async function resetPassword(state: {
  email: string;
  otp: string[];
  password: string;
}) {
  const payload = {
    email: route.params.email as string,
    otp: state.otp.join(""),
    password: state.password,
  };

  await authStore.resetPassword(payload);
};
</script>

<template>
  <section class="text-black pt-8">
    <h1 class="text-3xl font-bold text-center">
      Reset your password
    </h1>
    <section
      class="w-full max-w-[500px] mx-auto mt-4"
    >
      <AppForm
        v-model:items="resetPasswordForm"
        submit-label="Reset Password"
        :loading="authStore.loading"
        @submit="resetPassword"
      />
    </section>
  </section>
</template>
