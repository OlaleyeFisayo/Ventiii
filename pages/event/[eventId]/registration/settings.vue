<script setup lang="ts">
const formData = reactive({
  registrationOpen: false,
});
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
      <div class="flex flex-col gap-4">
        <AppSwitch
          v-model="formData.registrationOpen"
          label="Registration Open"
          description="Allow new attendees to register"
        />
      </div>
    </AppCard>
  </section>
</template>
