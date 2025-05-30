<script setup lang="ts">
const resetPasswordForm = ref<AppFormItems[]>([
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
</script>

<template>
  <section class="text-black pt-16 pb-8">
    <h1 class="text-3xl font-bold text-center">
      Reset your password
    </h1>
    <section
      class="w-full max-w-[500px] mx-auto mt-4"
    >
      <AppForm
        v-model:items="resetPasswordForm"
        submit-label="Reset Password"
      />
    </section>
  </section>
</template>
