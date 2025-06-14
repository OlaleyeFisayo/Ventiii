<script lang="ts" setup>
import type {
  DropdownMenuItem,
} from "@nuxt/ui";

const authStore = useAuthStore();
const sidebarStore = useSidebarStore();

const dropdownMenuItems = ref<DropdownMenuItem[]>([
  [
    {
      label: "Logout",
      icon: "i-tabler-logout-2",
      color: "error",
      onSelect: () => {
        authStore.logout();
      },
    },
  ],
]);

const mobileDropdownMenuItems = computed<DropdownMenuItem[][]>(() => ([
  [
    {
      label: authStore.user?.name,
      avatar: {
        src: authStore.user?.image ?? "",
        alt: authStore.user?.image ? "" : authStore.user?.name.toUpperCase(),
      },
      type: "label",
    },
  ],
  [
    {
      label: "Logout",
      icon: "i-tabler-logout-2",
      color: "error",
      onSelect: () => {
        authStore.logout();
      },
    },
  ],
]));
</script>

<template>
  <section class="border-b-1 border-b-muted bg-gray-50 py-4.5 px-4 flex items-center justify-between">
    <section class="flex gap-2 items-center">
      <AppButton
        :icon="sidebarStore.desktopState ? 'i-tabler-layout-sidebar-left-expand-filled' : 'i-tabler-layout-sidebar-left-collapse-filled'"
        class="size-8 p-none text-xl text-black md:block hidden"
        variant="link"
        @click="sidebarStore.toggleState"
      />
      <AppButton
        :icon="sidebarStore.mobileState ? 'i-tabler-layout-sidebar-left-expand-filled' : 'i-tabler-layout-sidebar-left-collapse-filled'"
        class="size-8 p-none text-xl text-black md:hidden"
        variant="link"
        @click="sidebarStore.toggleState"
      />
      <div class="border-1 border-gray-300 h-[30px]" />
      <NuxtLink
        to="/dashboard"
        class="flex items-center"
      >
        <UIcon
          name="i-tabler-arrow-narrow-left"
          class="text-xl"
        />
        Dashboard
      </NuxtLink>
    </section>
    <section>
      <div class="hidden sm:flex gap-2 items-center">
        <AppDropdownMenu
          :items="dropdownMenuItems"
        >
          <div class="flex gap-2 items-center">
            <AppAvatar
              :src="authStore.user?.image ?? ''"
              :alt="authStore.user?.image ? '' : authStore.user?.name.toUpperCase()"
              size="xl"
            />
          </div>
        </AppDropdownMenu>
      </div>
      <div class="sm:hidden">
        <AppDropdownMenu
          :items="mobileDropdownMenuItems"
        >
          <AppButton
            icon="i-tabler-menu-2"
          />
        </AppDropdownMenu>
      </div>
    </section>
  </section>
</template>
