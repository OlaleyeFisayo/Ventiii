<script setup lang="ts">
const eventStore = useEventStore();

const eventInfo = reactive({
  eventName: "",
  description: "",
  date: {
    start: "",
    end: "",
  },
  time: {
    start: "",
    end: "",
  },
  location: "",
  coverPicture: [],
  logo: [],
});

watch(
  () => eventStore.event,
  (event) => {
    if (event) {
      eventInfo.eventName = event.title || "";
      eventInfo.description = event.description || "";
      eventInfo.date.start = event.startDate ? useConvertToCalendarDate(event.startDate) : null;
      eventInfo.date.end = event.endDate ? useConvertToCalendarDate(event.endDate) : null;
      eventInfo.time.start = event.startTime || "";
      eventInfo.time.end = event.endTime || "";
      eventInfo.location = event.location || "";
    }
  },
  {
    immediate: true,
  },
);
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
    <div v-if="eventStore.loading">
      <AppSkeleton class="w-full h-[200px]" />
    </div>
    <AppCard v-else>
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
          <AppInput
            v-model="eventInfo.eventName"
            placeholder="Change Event Name"
          />
        </AppFormField>
        <AppFormField label="Description">
          <AppTextarea
            v-model="eventInfo.description"
            placeholder="Change Description"
          />
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
          <AppInput
            v-model="eventInfo.location"
            placeholder="Change Location"
          />
        </AppFormField>
        <div class="sm:grid sm:grid-cols-2 flex flex-col gap-2">
          <AppFormField label="Cover Picture">
            <div
              v-if="eventStore.event?.coverPictureUrl"
              class="mb-2"
            >
              <h1>Current Image: </h1>
              <NuxtImg
                alt="User Image"
                :width="100"
                :src="eventStore.event?.coverPictureUrl"
              />
            </div>
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
            <div
              v-if="eventStore.event?.logo"
              class="mb-2"
            >
              <h1>Current Image: </h1>
              <NuxtImg
                alt="User Image"
                :width="100"
                :src="eventStore.event?.logo"
              />
            </div>
            <AppImageDnd
              v-model="eventInfo.logo"
              :max-files="1"
              :max-file-size="1 * 1024 * 1024"
            />
          </AppFormField>
        </div>
      </div>
    </AppCard>
    <div
      v-if="eventStore.loading"
      class="flex justify-end gap-2"
    >
      <AppSkeleton class="w-20 h-9" />
      <AppSkeleton class="w-20 h-9" />
    </div>
    <div
      v-else
      class="flex justify-end gap-2"
    >
      <AppButton
        label="Cancel"
        theme="secondary"
      />
      <AppButton label="Save Changes" />
    </div>
  </section>
</template>
