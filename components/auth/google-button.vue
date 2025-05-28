<script lang="ts" setup>
const authStore = useAuthStore();
</script>

<template>
  <AppButton
    label="Continue with Google"
    class="w-full flex items-center justify-center p-3 mb-4"
    theme="secondary"
    trailing-icon="i-tabler-brand-google-filled"
    :loading="authStore.loading"
    loading-auto
    @click="authStore.googleSignIn"
  />
</template>
