<script setup lang="ts">
import {
  NuxtLink,
} from "#components";

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
      <AppForm
        v-model:items="registerForm"
        submit-label="Sign up"
      />
      <AppSeperator label="or" class="my-4" />
      <AppButton
        label="Continue with Google"
        class="w-full flex items-center justify-center p-3 mb-4"
        theme="secondary"
        trailing-icon="i-tabler-brand-google-filled"
      />
      <NuxtLink to="/log-in" class="underline flex items-center justify-center text-purple-900">
        Already have an account? Log in
      </NuxtLink>
    </section>
  </section>
</template>
