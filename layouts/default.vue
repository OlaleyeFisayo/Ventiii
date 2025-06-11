<script lang="ts" setup>
const authStore = useAuthStore();
await authStore.init();
</script>

<template>
  <section class="flex flex-col min-h-[100dvh]">
    <AppNavBar />
    <main class="px-8 flex-1 flex flex-col">
      <section class="text-black container mx-auto h-full flex-1 pt-8 pb-4 ">
        <slot />
      </section>
    </main>
  </section>
</template>
