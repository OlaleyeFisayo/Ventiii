<script lang="ts" setup>
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
    value: null,
    maxFile: 1,
    maxFileSize: 5 * 1024 * 1024,
  },
]);

const isDirty = ref(false);

onBeforeRouteLeave(() => {
  if (isDirty.value) {
    // eslint-disable-next-line no-alert
    const confirm = window.confirm("Are you sure you want to leave? All unsaved changes will be gone");
    if (!confirm)
      return false;
  }
  return true;
});

async function createEvent(state: {
  title: string;
  description: string;
  date: {
    startDate: string;
    endDate: string | null;
  };
  time: {
    start: string;
    end: string;
  };
  location: string;
  coverPicture: string;
}) {
  await $fetch("/api/event", {
    method: "post",
    body: state,
  });
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
        @submit="createEvent"
      />
    </section>
  </section>
</template>
