<script lang="ts" setup>
const createEventForm = ref<AppFormItems[]>([
  {
    label: "Event Name",
    tag: "title",
    type: "text",
    placeholder: "Enter name",
    value: "",
  },
  {
    label: "Event Description",
    tag: "description",
    type: "textarea",
    placeholder: "Enter description",
    value: "",
  },
  {
    label: "Event Date",
    tag: "date",
    type: "date",
    value: null,
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
