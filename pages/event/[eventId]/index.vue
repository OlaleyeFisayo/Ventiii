<script setup lang="ts">
const route = useRoute();
const eventId = route.params.eventId;
const defaultEventUrl = `/event/${eventId}`;
</script>

<template>
  <section>
    <section class="flex gap-2 justify-between items-center">
      <div>
        <h1 class="text-2xl text-black font-bold">
          Event Overview
        </h1>
        <p class="text-muted text-md">
          Manage and monitor your event details and statistics.
        </p>
      </div>
      <AppButton
        label="View Landing Page"
        icon="i-tabler-eye"
        class="border-2! bg-inherit! text-black! rounded-2xl! hover:bg-gray-100!"
        :to="`${defaultEventUrl}/landing-page`"
      />
    </section>
  </section>
</template>
