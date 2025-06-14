<script setup lang="ts">
import type {
  TabsItem,
} from "@nuxt/ui";

const eventStore = useEventStore();

const items = computed<TabsItem[]>(() => ([
  {
    label: "All",
    value: "all",
    disabled: eventStore.loading,
  },
  {
    label: "Upcoming",
    value: "upcoming",
    disabled: eventStore.loading,
  },
  {
    label: "Past",
    value: "past",
    disabled: eventStore.loading,
  },
]));

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

// Search Feature
const searchInput = ref(route.query.search as string || "");

async function handleSearch() {
  page.value = 1;
  router.push({
    path: "/dashboard",
    query: {
      option: "all",
      search: searchInput.value,
    },
  });

  await eventStore.getEvents(route.query.option, page.value, itemsPerPage.value, searchInput.value.trim());
}

watch(() => route.query.option, async (newOption: LocationQueryValue | LocationQueryValue[]) => {
  if (newOption) {
    page.value = 1;
    await eventStore.getEvents(newOption as string, page.value, itemsPerPage.value, searchInput.value.trim());
  }
}, {
  immediate: true,
});

watch(
  () => page.value,
  async (newPage: number) => {
    await eventStore.getEvents(route.query.option, newPage, itemsPerPage.value, searchInput.value.trim());
  },
);

watch(
  () => searchInput.value,
  async (newInput: string, oldInput: string) => {
    page.value = 1;
    if (!newInput && oldInput && route.query.search) {
      router.push({
        path: "/dashboard",
        query: {
          option: "all",
        },
      });
      await eventStore.getEvents(route.query.option, page.value, itemsPerPage.value, newInput.trim());
    }
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
    <div class="flex items-center">
      <AppInput
        v-model="searchInput"
        placeholder="Search Event by name"
        icon="i-tabler-search"
        base-class="pl-9 rounded-r-none"
        :disabled="eventStore.loading"
      />
      <AppButton
        label="Search"
        class="p-4 rounded-l-none"
        :disabled="!searchInput || eventStore.loading"
        :loading="eventStore.loading"
        @click="handleSearch"
      />
    </div>
    <AppTabs
      v-if="!route.query.search"
      v-model="activeTab"
      :items="items"
      size="xl"
    />
    <h1
      v-else-if="route.query.search && eventStore.eventsData?.events.length !== 0"
      class="text-xl font-light"
    >
      Search Result:
    </h1>
    <div>
      <h1
        v-if="route.query.search && eventStore.eventsData?.events.length === 0 && !eventStore.loading"
        class="w-full text-2xl text-center"
      >
        No Event Found with that name
      </h1>
      <h1
        v-if="!route.query.search && route.query.option === 'all' && eventStore.eventsData?.events.length === 0 && !eventStore.loading"
        class="w-full text-2xl text-center"
      >
        No Event Created yet
      </h1>
      <h1
        v-if="!route.query.search && route.query.option === 'upcoming' && eventStore.eventsData?.events.length === 0 && !eventStore.loading"
        class="w-full text-2xl text-center"
      >
        No Upcoming Event
      </h1>
      <h1
        v-if="!route.query.search && route.query.option === 'past' && eventStore.eventsData?.events.length === 0 && !eventStore.loading"
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
        v-if="!eventStore.loading"
        v-model:page="page"
        :total="total"
        :items-per-page="itemsPerPage"
        :disabled="eventStore.loading"
      />
    </div>
  </section>
</template>
