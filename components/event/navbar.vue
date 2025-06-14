<script setup lang="ts">
const route = useRoute();
const eventId = route.params.eventId;
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
        :to="`/event/${eventId}`"
      >
        <div class="p-2 bg-black flex items-center justify-center rounded-2xl">
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
  </AppCard>
</template>
