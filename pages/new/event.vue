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
</script>

<template>
  <section class="flex flex-col sm:gap-8 gap-4 items-center">
    <h1 class="font-bold text-3xl text-black">
      Create Event
    </h1>

    <section class="w-full max-w-[500px]">
      <AppForm
        v-model:items="createEventForm"
        submit-label="Create Event"
      />
    </section>
  </section>
</template>
