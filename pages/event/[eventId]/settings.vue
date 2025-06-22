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

const confirmDelete = ref(false);
function toggleConfirmDelete() {
  confirmDelete.value = !confirmDelete.value;
}
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
              v-if="eventStore.event?.logoUrl"
              class="mb-2"
            >
              <h1>Current Image: </h1>
              <NuxtImg
                alt="User Image"
                :width="100"
                :src="eventStore.event?.logoUrl"
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
    <AppCard class="mt-4">
      <template #header>
        <h1 class="text-lg">
          Danger Zone
        </h1>
        <p class="text-muted text-md">
          Irreversible actions for your event
        </p>
      </template>
      <AppCard theme="error">
        <section class="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h2>Delete Event</h2>
            <p class="text-muted text-sm">
              Permanently delete this Event and all associated data.
            </p>
          </div>
          <AppButton
            label="Delete Account"
            color="error"
            class="px-4 py-3"
            loading-auto
            @click="toggleConfirmDelete"
          />
        </section>
      </AppCard>
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

    <AppModal
      v-model:open="confirmDelete"
      :dismissible="false"
    >
      <template #content>
        <div class="flex flex-col items-center justify-center gap-2 px-4 py-8">
          <p>Are you sure you want to delete this event?</p>
          <div class="flex gap-4">
            <AppButton
              label="No"
              theme="secondary"
              class="px-4 py-2.5"
              loading-auto
              @click="toggleConfirmDelete"
            />
            <AppButton
              label="Yes"
              class="px-4 py-2.5"
              loading-auto
              @click="toggleConfirmDelete"
            />
          </div>
        </div>
      </template>
    </AppModal>
  </section>
</template>
