<script setup lang="ts">
import type {
  NavigationMenuItem,
} from "@nuxt/ui";

const route = useRoute();
const eventId = route.params.eventId;
const defaultEventUrl = `/event/${eventId}`;

const navItemsClass = "text-lg";
const navItems = computed<NavigationMenuItem[]>(() => ([
  {
    label: "Overview",
    to: defaultEventUrl,
    icon: "i-tabler-presentation-analytics",
    class: navItemsClass,
  },
  {
    label: "Settings",
    to: `${defaultEventUrl}/settings`,
    icon: "i-tabler-settings",
    class: navItemsClass,
  },
]));
</script>

<template>
  <AppCard
    :ui="{
      root: 'w-full max-w-[250px] h-[100dvh]',
    }"
  >
    <template #header>
      <NuxtLink
        class="flex items-center gap-2"
        :to="defaultEventUrl"
      >
        <div class="p-2 bg-primary flex items-center justify-center rounded-2xl">
          <UIcon
            name="i-tabler-calendar-week-filled"
            class="text-white size-6"
          />
        </div>
        <div>
          <h1 class="text-md font-semibold w-[150px] text-nowrap overflow-hidden overflow-ellipsis">
            Community Tech Meetup
          </h1>
          <p class="text-sm overflow-x-hidden text-nowrap overflow-ellipsis w-[150px]!">
            {{ eventId }}
          </p>
        </div>
      </NuxtLink>
    </template>
    <template #default>
      <section>
        <h1 class="text-sm text-muted">
          Navigation:
        </h1>

        <AppNavigationMenu :items="navItems" />
      </section>
    </template>
  </AppCard>
</template>
