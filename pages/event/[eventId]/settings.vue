<script setup lang="ts">
const eventInfo = reactive({
  eventName: "",
  description: "",
  date: null,
  time: {
    start: "",
    end: "",
  },
  location: "",
  coverPicture: [],
  logo: [],
});
</script>

<template>
  <section class="flex flex-col gap-4">
    <div>
      <h1 class="text-2xl text-black font-bold">
        Event Settings
      </h1>
      <p class="text-muted text-md">
        Configure your event details and preferences.
      </p>
    </div>
    <AppCard>
      <template #header>
        <h1 class="text-xl font-semibold">
          General Information
        </h1>
        <p class="text-muted">
          Basic details about your event.
        </p>
      </template>
      <div class="flex flex-col gap-2">
        <AppFormField label="Event Name">
          <AppInput v-model="eventInfo.eventName" />
        </AppFormField>
        <AppFormField label="Description">
          <AppTextarea v-model="eventInfo.description" />
        </AppFormField>
        <AppFormField label="Date">
          <AppCalendar v-model="eventInfo.date" />
        </AppFormField>
        <AppFormField label="Time">
          <AppTime
            v-model:start="eventInfo.time.start"
            v-model:end="eventInfo.time.end"
          />
        </AppFormField>
        <AppFormField label="Location">
          <AppInput v-model="eventInfo.location" />
        </AppFormField>
        <div class="grid grid-cols-2 gap-2">
          <AppFormField label="Cover Picture">
            <AppImageDnd
              v-model="eventInfo.coverPicture"
              :max-files="1"
              :max-file-size="5 * 1024 * 1024"
            />
          </AppFormField>
          <AppFormField
            label="Event Logo"
            optional
          >
            <AppImageDnd
              v-model="eventInfo.logo"
              :max-files="1"
              :max-file-size="1 * 1024 * 1024"
            />
          </AppFormField>
        </div>
      </div>
    </AppCard>
    <div class="flex justify-end gap-2">
      <AppButton
        label="Cancel"
        theme="secondary"
      />
      <AppButton label="Save Changes" />
    </div>
  </section>
</template>
