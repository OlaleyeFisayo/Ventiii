<script setup lang="ts">
import type {
  NavigationMenuItem,
} from "@nuxt/ui";

const route = useRoute();
const eventId = route.params.eventId;
const defaultEventUrl = `/event/${eventId}`;

const sidebarStore = useSidebarStore();
const eventStore = useEventStore();

const isOpened = computed({
  get() {
    return sidebarStore.mobileState;
  },
  set(state: boolean) {
    sidebarStore.mobileState = state;
  },
});

const navItems = computed<NavigationMenuItem[]>(() => ([
  {
    label: "Navigation:",
    type: "label",
  },
  {
    label: "Overview",
    type: "link",
    to: defaultEventUrl,
    icon: "i-tabler-layout-dashboard",
  },
  {
    label: "Settings",
    type: "link",
    to: `${defaultEventUrl}/settings`,
    icon: "i-tabler-settings-cog",
  },
]));
</script>

<template>
  <UDrawer
    v-model:open="isOpened"
    direction="left"
    :handle="false"
    class="md:hidden"
  >
    <template #body>
      <section
        class="w-full"
      >
        <NuxtLink
          class="flex items-center gap-2 border-b-muted border-b-1 py-4 justify-center px-4"
          :to="defaultEventUrl"
        >
          <AppSkeleton
            v-if="eventStore.loading"
            class="w-9.5 h-10"
          />
          <div
            v-else
            class="p-2 bg-primary flex items-center justify-center rounded-2xl"
          >
            <UIcon
              name="i-tabler-calendar-week-filled"
              class="text-white size-6"
            />
          </div>
          <div
            class="min-w-0 flex-1"
          >
            <AppSkeleton
              v-if="eventStore.loading"
              class="max-w-[150px] w-full h-5"
            />
            <h1
              v-else
              class="text-md font-semibold max-w-[150px] w-full text-nowrap overflow-hidden overflow-ellipsis"
            >
              {{ eventStore.event?.title }}
            </h1>
            <p class="text-sm overflow-x-hidden text-nowrap overflow-ellipsis max-w-[150px] w-full">
              {{ eventId }}
            </p>
          </div>
        </NuxtLink>
        <section class="p-4">
          <AppNavigationMenu
            :items="navItems"
          />
        </section>
      </section>
    </template>
    <UDrawer />
  </udrawer>
</template>
