<script setup lang="ts">
const eventStore = useEventStore();
const cloudinaryStore = useCloudinaryStore();

const eventInfo = reactive({
  title: "",
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
      eventInfo.title = event.title || "";
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

async function deleteEvent() {
  await Promise.all([
    isMyCloudinaryUrl(eventStore.event?.coverPictureUrl),
    isMyCloudinaryUrl(eventStore.event?.logoUrl),
    eventStore.deleteEvent(eventStore.event?.id as string),
  ]);
}

const errorMessage = ref("");

const isFormChanged = computed(() => {
  const isOldTitle = eventInfo.title === eventStore.event?.title;
  const isOldDescription = eventInfo.description === eventStore.event?.description;
  const isOldStartDate = new Date(eventInfo.date.start).getTime() === new Date(eventStore.event?.startDate).getTime();
  const isOldEndDate = new Date(eventInfo.date.end).getTime() === new Date(eventStore.event?.endDate).getTime();
  const isOldStartTime = eventInfo.time.start === eventStore.event?.startTime;
  const isOldEndTime = eventInfo.time.end === eventStore.event?.endTime;
  const isOldLocation = eventInfo.location === eventStore.event?.location;
  if (isOldTitle
    && isOldDescription
    && isOldStartDate
    && isOldEndDate
    && isOldStartTime
    && isOldEndTime
    && isOldLocation
  ) {
    setErrorMessage(
      errorMessage,
      "You have to change an entry to update your event",
    );
    return false;
  }
  const timeError = useTimeRangeValidator({
    start: eventInfo.time.start,
    end: eventInfo.time.end,
  });
  if (timeError) {
    setErrorMessage(
      errorMessage,
      "End time cannot be the same as or earlier than the start time.",
    );
    return false;
  }
  return true;
});

async function updateEvent() {
  if (!isFormChanged.value) {
    return;
  }

  const updateData = {
    title: eventInfo.title,
    description: eventInfo.description ?? null,
    startDate: new Date(eventInfo.date.start),
    endDate: new Date(eventInfo.date.end),
    startTime: eventInfo.time.start,
    endTime: eventInfo.time.end,
  };

  const uploadPromises = [];

  if (eventInfo.coverPicture.length > 0) {
    uploadPromises.push(Promise.all([
      isMyCloudinaryUrl(eventStore.event?.coverPictureUrl),
      cloudinaryStore.upload(eventInfo.coverPicture[0]),
    ]).then(([, uploadResult]) => {
      updateData.coverPictureUrl = uploadResult.url;
    }));
  }

  if (eventInfo.logo.length > 0) {
    uploadPromises.push(Promise.all([
      isMyCloudinaryUrl(eventStore.event?.logoUrl),
      cloudinaryStore.upload(eventInfo.logo[0]),
    ]).then(([, uploadResult]) => {
      updateData.logoUrl = uploadResult.url;
    }));
  }

  if (uploadPromises.length > 0) {
    await Promise.all(uploadPromises);
  }

  await eventStore.updateEvent(
    eventStore.event?.id as string,
    updateData,
  );
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
        <AppAlert
          v-if="errorMessage"
          color="error"
          class="w-full mx-auto mt-2"
          title="Error"
          icon="i-tabler-info-square-rounded-filled"
          :description="errorMessage"
        />
        <AppFormField label="Event Name">
          <AppInput
            v-model="eventInfo.title"
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
              :max-file-size="2 * 1024 * 1024"
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
                :width="92"
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
            :loading="eventStore.loading"
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
        label="Save Changes"
        loading-auto
        :loading="eventStore.loading || cloudinaryStore.loading"
        @click="updateEvent"
      />
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
              @click="deleteEvent"
            />
          </div>
        </div>
      </template>
    </AppModal>
  </section>
</template>
