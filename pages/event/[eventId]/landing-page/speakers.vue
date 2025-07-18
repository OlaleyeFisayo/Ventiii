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
    <h1 class="text-2xl text-black font-bold">
      Speakers
    </h1>
    <div class="flex flex-col gap-2">
      <LandingPageSpeakersCard
        v-for="speaker in speakerStore.speakers"
        :key="speaker.id"
        :speaker="speaker"
      />
    </div>
  </section>
</template>
