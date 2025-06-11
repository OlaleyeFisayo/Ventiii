<script lang="ts" setup>
import type {
  DropdownMenuItem,
} from "@nuxt/ui";

const authStore = useAuthStore();

const authLinks = [
  {
    label: "Sign up",
    to: "/",
  },
  {
    label: "Log in",
    to: "/log-in",
    theme: "secondary",
  },
];

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
      label: "New Event",
      icon: "i-tabler-plus",
      to: "/new/event",
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
  <section class="border-b-1 border-b-gray-300 py-4 px-8 flex items-center justify-between">
    <NuxtLink
      :to="authStore.user ? '/dashboard' : '/'"
      class="flex gap-2 items-center text-xl font-extrabold"
    >
      <img
        src="../../assets/images/logo.png"
        alt="logo"
        class="w-5 h-5"
      >
      Ventiii
    </NuxtLink>
    <section
      v-if="authStore.sessionLoading"
      class="flex gap-2 items-center"
    >
      <USkeleton class="h-10 w-[100px]" />
      <USkeleton class="h-10 w-10 rounded-full" />
    </section>
    <section v-else-if="authStore.user && !authStore.sessionLoading">
      <div class="hidden sm:flex gap-2 items-center">
        <AppButton
          label="New Event"
          icon="i-tabler-plus"
          to="/new/event"
        />
        <AppDropdownMenu
          :items="dropdownMenuItems"
        >
          <div class="flex gap-2 items-center">
            <p>Hi, {{ authStore.user.name }}</p>
            <AppAvatar
              :src="authStore.user.image ?? ''"
              :alt="authStore.user.image ? '' : authStore.user.name.toUpperCase()"
              size="lg"
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
    <nav
      v-else
      class="flex gap-2 items-center"
    >
      <AppButton
        v-for="link in authLinks"
        :key="link.label"
        :label="link.label"
        :to="link.to"
        :theme="link?.theme"
      />
    </nav>
  </section>
</template>
