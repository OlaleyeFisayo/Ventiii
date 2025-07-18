<script setup lang="ts">
const phrases = [
  "Plan events with zero hassle.",
  "Sell tickets, manage RSVPs, and more.",
  "Add speakers, share media, stay organized.",
  "Engage your audience effortlessly.",
  "Customize every part of your event.",
  "Track attendance in real-time.",
  "All your event tools in one place.",
  "Built for organizers. Loved by attendees.",
  "Smart features for smarter events.",
  "Make your event unforgettable.",
];
</script>

<template>
  <section class="grid grid-cols-1 md:grid-cols-2 h-[100dvh]">
    <section class="md:flex flex-col gap-4 hidden bg-primary-600 p-8 text-white justify-between">
      <div
        class="flex gap-2 items-center text-xl font-extrabold"
      >
        <img
          src="../assets/images/logo.png"
          alt="logo"
          class="w-10 h-10"
        >
        Ventiii
      </div>
      <AppTypeWriter
        :messages="phrases"
        class="text-7xl"
      />
      <p>
        @ Olaleye Fisayo
      </p>
    </section>
    <main class="w-full">
      <NuxtPage />
    </main>
  </section>
</template>
