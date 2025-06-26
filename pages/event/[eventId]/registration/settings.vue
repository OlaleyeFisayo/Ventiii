<script setup lang="ts">
// code...
</script>

<template>
  <section class="flex flex-col gap-4">
    <div>
      <h1 class="text-2xl text-black font-bold">
        Registration Settings
      </h1>
      <p class="text-muted text-md">
        Manage or disable registration settings for your event.
      </p>
    </div>
    <AppCard>
      <template #header>
        <h1 class="text-xl font-semibold">
          Registration Settings
        </h1>
        <p class="text-muted">
          Configure how attendees can register for your event.
        </p>
      </template>
    </AppCard>
  </section>
</template>
