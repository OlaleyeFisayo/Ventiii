<script setup lang="ts">
import type {
  TabsItem,
} from "@nuxt/ui";

const eventStore = useEventStore();

const items = ref<TabsItem[]>([
  {
    label: "All",
    value: "all",
  },
  {
    label: "Upcoming",
    value: "upcoming",
  },
  {
    label: "Past",
    value: "past",
  },
]);

const route = useRoute();
const router = useRouter();

const activeTab = computed({
  get() {
    return (route.query.option as string) || items.value[0].value;
  },
  async set(option: string) {
    router.push({
      path: "/dashboard",
      query: {
        option,
      },
    });
  },
});

// Pagination feature
const page = ref(1);
const itemsPerPage = ref(10);
const total = computed(() => eventStore.eventsData?.pagination?.total);

watch(() => route.query.option, async (newOption) => {
  if (newOption) {
    page.value = 1;
    await eventStore.getEvents(newOption as string, page.value, itemsPerPage.value);
  }
}, {
  immediate: true,
});

watch(
  () => page.value,
  async (newPage: number) => {
    await eventStore.getEvents(route.query.option, newPage, itemsPerPage.value);
  },
);

onMounted(async () => {
  if (!route.query.option) {
    router.push({
      path: "/dashboard",
      query: {
        option: items.value[0].value,
      },
    });
  }
});
</script>

<template>
  <section class="text-black flex flex-col gap-4">
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
      v-model="activeTab"
      :items="items"
      size="xl"
    />
    <div>
      <h1
        v-if="route.query.option === 'all' && eventStore.eventsData?.events.length === 0 && !eventStore.loading"
        class="w-full text-2xl text-center"
      >
        No Event
      </h1>
      <h1
        v-if="route.query.option === 'upcoming' && eventStore.eventsData?.events.length === 0 && !eventStore.loading"
        class="w-full text-2xl text-center"
      >
        No Upcoming Event
      </h1>
      <h1
        v-if="route.query.option === 'past' && eventStore.eventsData?.events.length === 0 && !eventStore.loading"
        class="w-full text-2xl text-center"
      >
        No Past Event
      </h1>
    </div>
    <div
      v-if="eventStore.eventsData?.events && !eventStore.loading"
      class="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 place-items-center gap-4"
    >
      <EventCard
        v-for="event in eventStore.eventsData?.events"
        :id="event.id"
        :key="event.id"
        :title="event.title"
        :img="event.coverPictureUrl"
        :start-date="event.startDate"
        :end-date="event.endDate"
      />
    </div>
    <div
      v-if="eventStore.loading"
      class="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 place-items-center gap-4"
    >
      <div
        v-for="i in 2"
        :key="i"
        class="shadow w-full max-w-[300px] p-4 rounded-2xl"
      >
        <AppSkeleton class="w-full max-w-[300px] h-[200px] rounded-md" />
        <AppSkeleton class="w-full max-w-[300px] h-9 mt-2 rounded-md" />
      </div>
    </div>
    <div
      v-if="eventStore.eventsData?.events.length !== 0"
      class="w-full flex itams-center justify-center"
    >
      <AppPagination
        v-model:page="page"
        :total="total"
        :items-per-page="itemsPerPage"
        :disabled="eventStore.loading"
      />
    </div>
  </section>
</template>
