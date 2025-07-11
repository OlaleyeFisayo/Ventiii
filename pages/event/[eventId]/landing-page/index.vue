<script setup lang="ts">
definePageMeta({
  layout: false,
});

const eventStore = useEventStore();

const route = useRoute();
const eventId = route.params.eventId;

const startDate = computed(() => useFormatShortDate(eventStore.event?.startDate as string));
const endDate = computed(() => useFormatShortDate(eventStore.event?.endDate as string));

const areDatesSame = computed(() =>
  eventStore.event?.startDate === eventStore.event?.endDate);

onMounted(async () => {
  await eventStore.getEvent(eventId as string);
});
</script>

<template>
  <section class="w-full p-4">
    <div class="container mx-auto flex flex-col gap-4 text-black">
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
    </div>
  </section>
</template>
