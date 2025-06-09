<script setup lang="ts">
import type {
  TabsItem,
} from "@nuxt/ui";

const eventStore = useEventStore();

const items = ref<TabsItem[]>([
  {
    label: "Upcoming",
  },
  {
    label: "Past",
  },
]);

onMounted(async () => {
  await eventStore.getEvents();
});
</script>

<template>
  <section class="text-black flex flex-col sm:gap-8 gap-4">
    <div class="flex items-center justify-between gap-2">
      <h1 class="font-bold sm:text-4xl text-xl">
        Your Events
      </h1>
      <AppButton
        label="New Event"
        icon="i-tabler-plus"
        theme="secondary"
        class="sm:text-lg text-md"
        to="/new/event"
      />
    </div>
    <AppInput
      placeholder="Search Event"
      icon="i-tabler-search"
      base-class="pl-9"
    />
    <AppTabs
      :items="items"
      size="xl"
    />
    <div class="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 place-items-center gap-4">
      <EventCard
        v-for="event in eventStore.events"
        :id="event.id"
        :key="event.id"
        :title="event.title"
        :img="event.coverPictureUrl"
        :start-date="event.startDate"
        :end-date="event.endDate"
      />
    </div>
  </section>
</template>
