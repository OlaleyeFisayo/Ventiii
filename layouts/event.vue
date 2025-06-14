<script setup lang="ts">
const authStore = useAuthStore();
await authStore.init();
</script>

<template>
  <section class="text-black flex">
    <EventSidebar />
    <EventMobileSidebar />
    <div class="flex flex-col w-full">
      <EventNavBar />
      <main class="w-full flex-1">
        <slot />
      </main>
    </div>
  </section>
</template>
