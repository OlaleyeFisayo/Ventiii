<script setup lang="ts">
const speakerStore = useSpeakerStore();

const route = useRoute();
const eventId = route.params.eventId;

onMounted(async () => {
  await speakerStore.getSpeakers(eventId as string);
});
</script>

<template>
  <section class="flex flex-col gap-2">
    <template v-if="speakerStore.loading">
      <AppSkeleton
        v-for="i in 2"
        :key="i"
        class="w-full h-20"
      />
    </template>
    <div
      v-else
      class="flex flex-col gap-2"
    >
      <LandingPageSpeakersCard
        v-for="speaker in speakerStore.speakers"
        :key="speaker.id"
        :speaker="speaker"
      />
    </div>
  </section>
</template>
