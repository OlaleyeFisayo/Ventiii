<script lang="ts" setup>
import {
  createAuthClient,
} from "better-auth/client";

const authClient = createAuthClient();

async function signIn() {
  await authClient.signIn.social({
    provider: "google",
    callbackURL: "/dashboard",
  });
}
</script>

<template>
  <AppButton
    label="Continue with Google"
    class="w-full flex items-center justify-center p-3 mb-4"
    theme="secondary"
    trailing-icon="i-tabler-brand-google-filled"
    @click="signIn"
  />
</template>
