<script setup lang="ts">
import type {
  NavigationMenuItem,
} from "@nuxt/ui";

const route = useRoute();
const eventId = route.params.eventId;
const defaultEventUrl = `/event/${eventId}`;

const sidebarStore = useSidebarStore();
const isCollapsed = computed(() => sidebarStore.desktopState);

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
    tooltip: isCollapsed.value
      ? {
          text: "Overview",
        }
      : undefined,
  },
  {
    label: "Settings",
    type: "link",
    to: `${defaultEventUrl}/settings`,
    icon: "i-tabler-settings-cog",
    tooltip: isCollapsed.value
      ? {
          text: "Settings",
        }
      : undefined,
  },
]));
</script>

<template>
  <section
    :class="`bg-gray-50 hidden md:block w-full h-[100dvh] border-muted border-1 transition-all duration-300 ease-in-out ${
      isCollapsed ? 'max-w-[72px]' : 'max-w-[265px]'
    }`"
  >
    <NuxtLink
      :class="`flex items-center gap-2 border-b-muted border-b-1 transition-all duration-300 ease-in-out ${
        isCollapsed ? 'px-2 justify-center py-4.5' : 'px-4 py-4'
      }`"
      :to="defaultEventUrl"
    >
      <div class="p-2 bg-primary flex items-center justify-center rounded-2xl flex-shrink-0">
        <UIcon
          name="i-tabler-calendar-week-filled"
          class="text-white size-6"
        />
      </div>
      <Transition
        enter-active-class="transition-all duration-300 ease-in-out"
        leave-active-class="transition-all duration-300 ease-in-out"
        enter-from-class="opacity-0 transform scale-95"
        enter-to-class="opacity-100 transform scale-100"
        leave-from-class="opacity-100 transform scale-100"
        leave-to-class="opacity-0 transform scale-95"
      >
        <div
          v-if="!isCollapsed"
          class="min-w-0 flex-1"
        >
          <h1 class="text-md font-semibold w-[150px] text-nowrap overflow-hidden overflow-ellipsis">
            Insert Event Name Here
          </h1>
          <p class="text-sm overflow-x-hidden text-nowrap overflow-ellipsis w-[150px]">
            {{ eventId }}
          </p>
        </div>
      </Transition>
    </NuxtLink>
    <section :class="`transition-all duration-300 ease-in-out ${isCollapsed ? 'p-2 flex flex-col items-center' : 'p-4'}`">
      <AppNavigationMenu
        :items="navItems"
        :collapsed="isCollapsed"
      />
    </section>
  </section>
</template>
