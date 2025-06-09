<script lang="ts" setup>
defineProps({
  id: String,
  title: String,
  img: String,
  startDate: String,
  endDate: String,
});

const cardWidth = ref(300);
</script>

<template>
  <NuxtLink
    as="NuxtLink"
    :to="`/event/${id}`"
    :class="`shadow w-full max-w-[${cardWidth}px] p-4 rounded-2xl`"
  >
    <NuxtImg
      :src="img"
      :width="cardWidth"
      height="250"
      :alt="`${title} image`"
      class="rounded-md"
    />
    <div class="mt-2">
      <h1 class="w-full font-bold text-lg">
        {{ title }}
      </h1>
      <p>
        <span>{{ startDate }}</span>
        to
        <span>{{ endDate }}</span>
      </p>
    </div>
  </NuxtLink>
</template>
