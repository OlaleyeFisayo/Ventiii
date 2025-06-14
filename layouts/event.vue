<script setup lang="ts">
</script>

<template>
  <section class="text-black flex">
    <EventSidebar />
    <EventMobileSidebar />
    <div class="flex flex-col">
      <main class="w-full border border-red-500 flex-1">
        <slot />
      </main>
    </div>
  </section>
</template>
