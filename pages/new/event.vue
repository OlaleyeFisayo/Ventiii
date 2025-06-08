<script lang="ts" setup>
const eventStore = useEventStore();
const cloudinaryStore = useCloudinaryStore();

const createEventForm = ref<AppFormItems[]>([
  {
    label: "Title",
    tag: "title",
    type: "text",
    placeholder: "Enter name",
    value: "",
  },
  {
    label: "Description",
    tag: "description",
    type: "textarea",
    placeholder: "Enter description",
    value: "",
  },
  {
    label: "Date",
    tag: "date",
    type: "date",
    value: null,
  },
  {
    label: "Time",
    tag: "time",
    type: "time",
    value: {
      start: null,
      end: null,
    },
  },
  {
    label: "Location",
    tag: "location",
    type: "text",
    placeholder: "Enter location",
    value: "",
    icon: "i-tabler-map-pin",
  },
  {
    label: "Cover Picture",
    tag: "coverPicture",
    type: "img",
    value: [],
    maxFile: 1,
    maxFileSize: 5 * 1024 * 1024,
  },
]);

const isSubmitted = ref(false);
const isDirty = ref(false);

onBeforeRouteLeave(() => {
  if (!isSubmitted.value && isDirty.value) {
    // eslint-disable-next-line no-alert
    const confirm = window.confirm("Are you sure you want to leave? All unsaved changes will be gone");
    if (!confirm)
      return false;
  }
  return true;
});

async function createEvent(state: CreateEventState) {
  const {
    url,
  } = await cloudinaryStore.upload(state.coverPicture[0] as File);

  const payload = {
    title: state.title,
    description: state.description,
    startDate: state.date.start.toString(),
    endDate: state.date.end.toString(),
    startTime: state.time.start,
    endTime: state.time.end,
    location: state.location,
    coverPictureUrl: url,
  };

  await eventStore.createEvent(payload);

  if (eventStore.success) {
    isSubmitted.value = true;
    await navigateTo("/dashboard");
  }
};
</script>

<template>
  <section class="flex flex-col sm:gap-8 gap-4 items-center">
    <h1 class="font-bold text-3xl text-black">
      Create Event
    </h1>

    <section class="w-full max-w-[500px]">
      <AppForm
        v-model:is-dirty="isDirty"
        v-model:items="createEventForm"
        submit-label="Create Event"
        :loading="eventStore.loading || cloudinaryStore.loading"
        @submit="createEvent"
      />
    </section>
  </section>
</template>
