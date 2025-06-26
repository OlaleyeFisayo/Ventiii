<script setup lang="ts">
const maximumAttendance = ref(["50 - 100", "101 - 250"]);

const formData = reactive({
  maxAttendance: maximumAttendance.value[0],
  registrationOpen: true,
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
    <section class="flex flex-col gap-4">
      <AppCard>
        <div class="flex flex-col gap-4">
          <AppFormField
            label="Maximum attendance"
            class="w-full"
          >
            <AppSelect
              v-model="formData.maxAttendance"
              :items="maximumAttendance"
            />
          </AppFormField>
          <AppSwitch
            v-model="formData.registrationOpen"
            label="Registration Open"
            description="Allow new attendees to register"
          />
        </div>
      </AppCard>
      <AppCard v-if="formData.registrationOpen">
        <div class="flex flex-col gap-4">
          <AppFormField label="Registration Deadline">
            <AppDatePicker />
          </AppFormField>
        </div>
      </AppCard>
    </section>
  </section>
</template>
