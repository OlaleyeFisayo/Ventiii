<script lang="ts" setup>
const authStore = useAuthStore();

const authLinks = [
  {
    label: "Sign up",
    to: "/",
  },
  {
    label: "Log in",
    to: "/log-in",
    theme: "secondary",
  },
];
</script>

<template>
  <section class="border-b-1 border-b-gray-300 py-4 px-8 flex items-center justify-between">
    <h1 class="flex gap-2 items-center text-xl font-extrabold">
      <img src="../../assets/images/logo.png" alt="logo" class="w-5 h-5">
      Ventiii
    </h1>
    <div v-if="authStore.user" class="flex gap-3">
      <AppButton label="New Event" />
      <AppAvatar
        :src="authStore.user.image ?? ''"
        :alt="authStore.user.image ? '' : authStore.user.name.toUpperCase()"
        size="lg"
      />
    </div>
    <nav v-else class="flex gap-2 items-center">
      <AppButton
        v-for="link in authLinks"
        :key="link.label" :label="link.label"
        :to="link.to"
        :theme="link?.theme"
      />
    </nav>
  </section>
</template>
