<script setup lang="ts">
import type {
  NavigationMenuItem,
} from "@nuxt/ui";

const eventStore = useEventStore();

const route = useRoute();
const eventId = route.params.eventId;

const startDate = computed(() => useFormatShortDate(eventStore.event?.startDate as string));
const endDate = computed(() => useFormatShortDate(eventStore.event?.endDate as string));

const areDatesSame = computed(() =>
  eventStore.event?.startDate === eventStore.event?.endDate);

const defaultEventUrl = `/event/${eventId}`;
const navigation = computed<NavigationMenuItem[]>(() => {
  const items = [
    {
      label: "Details",
      to: `${defaultEventUrl}/landing-page`,
      icon: "i-tabler-list-details",
    },
  ];

  if (eventStore.event?.hasSpeakers) {
    items.push({
      label: "Speakers",
      to: `${defaultEventUrl}/landing-page/speakers`,
      icon: "i-tabler-speakerphone",
    });
  }

  return items;
});
onMounted(async () => {
  await eventStore.getEvent(eventId as string);
});
</script>

<template>
  <section class="w-full p-4">
    <section class="container mx-auto flex flex-col gap-4 text-black">
      <NuxtImg
        :src="eventStore.event?.coverPictureUrl"
        class="w-full rounded-2xl h-[300px] object-fit"
      />
      <div>
        <h1 class="text-3xl font-bold">
          {{ eventStore.event?.title }}
        </h1>
        <p
          v-if="eventStore.event?.description"
          class="text-muted text-base"
          v-html="eventStore.event?.description.replace(/\n/g, '<br>')"
        />
      </div>
      <div class="flex gap-4 flex-wrap items-center text-lg">
        <p class="flex items-center gap-1">
          <UIcon name="i-tabler-calendar-event" />
          <template v-if="areDatesSame">
            {{ startDate }}
          </template>
          <template v-else>
            {{ startDate }} - {{ endDate }}
          </template>
        </p>
        <p class="flex items-center gap-1">
          <UIcon name="i-tabler-clock" />
          {{ eventStore.event?.startTime }} - {{ eventStore.event?.endTime }}
        </p>
        <p class="flex items-center gap-1">
          <UIcon name="i-tabler-map-pin" />
          {{ eventStore.event?.location }}
        </p>
      </div>
    </section>
    <section class="container mx-auto flex gap-2 mt-6">
      <div>
        <AppNavigationMenu
          :items="navigation"
          link-class="text-black bg-slate-200 px-6 rounded-3xl"
          link-leading-icon-class="text-black"
          list-class="flex flex-col gap-3"
        />
      </div>
      <div class="text-black p-4 w-full">
        <slot />
      </div>
    </section>
  </section>
</template>
