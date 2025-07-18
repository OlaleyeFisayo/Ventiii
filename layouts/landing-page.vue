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
        alt="Event Cover"
      />
      <section class="flex gap-2 items-center">
        <NuxtImg
          v-if="eventStore.event?.logoUrl"
          :src="eventStore.event?.logoUrl"
          :width="100"
          class="object-fit"
          alt="Event Logo"
        />
        <div>
          <h1 class="text-3xl font-bold">
            {{ eventStore.event?.title }}
          </h1>
          <div class="flex gap-4 flex-wrap items-center text-lg">
            <p class="flex items-center gap-1">
              <UIcon name="i-tabler-calendar-event" />
              <span
                v-if="areDatesSame"
                class="text-muted"
              >
                {{ startDate }}
              </span>
              <span
                v-else
                class="text-muted"
              >
                {{ startDate }} - {{ endDate }}
              </span>
            </p>
            <p class="flex items-center gap-1">
              <UIcon name="i-tabler-clock" />
              <span class="text-muted">
                {{ eventStore.event?.startTime }} - {{ eventStore.event?.endTime }}
              </span>
            </p>
            <p class="flex items-center gap-1">
              <UIcon name="i-tabler-map-pin" />
              <span class="text-muted">
                {{ eventStore.event?.location }}
              </span>
            </p>
          </div>
        </div>
      </section>
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
