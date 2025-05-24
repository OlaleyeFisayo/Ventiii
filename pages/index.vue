<script setup lang="ts">
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
    </section>
  </section>
</template>
