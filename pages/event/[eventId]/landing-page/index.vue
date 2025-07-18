<script setup lang="ts">
const eventStore = useEventStore();
</script>

<template>
  <section>
    <template v-if="eventStore.loading">
      <AppSkeleton
        v-for="i in 2"
        :key="i"
        class="w-full h-20"
      />
    </template>
    <template v-else>
      <div
        v-if="eventStore.event?.description"
        class="flex flex-col gap-2"
      >
        <h1 class="font-bold text-2xl">
          Description
        </h1>
        <p
          v-if="eventStore.event?.description"
          class="text-muted text-lg"
          v-html="eventStore.event.description.replace(/\n/g, '<br>')"
        />
      </div>
    </template>
  </section>
</template>
