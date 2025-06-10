<script lang="ts" setup>
import {
  CalendarDate,
} from "@internationalized/date";

const props = defineProps({
  id: String,
  title: String,
  img: String,
  startDate: String,
  endDate: String,
});

const cardWidth = ref(300);
const startDate = computed(() => useFormatShortDate(props.startDate));
const endDate = computed(() => useFormatShortDate(props.endDate));

const isSameDay = computed(() => {
  const date = new Date(props.startDate);
  const start = new CalendarDate(
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate(),
  );

  const dateEnd = new Date(props.endDate);
  const end = new CalendarDate(
    dateEnd.getFullYear(),
    dateEnd.getMonth() + 1,
    dateEnd.getDate(),
  );

  return useAreDatesSame(start, end);
});
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
      :alt="`${title} image`"
      class="rounded-md"
    />
    <div class="mt-2">
      <h1 class="w-full font-bold text-md">
        {{ title }}
      </h1>
      <p
        v-if="!isSameDay"
        class="text-sm"
      >
        <span class="font-light">{{ startDate }}</span>
        -
        <span class="font-light">{{ endDate }}</span>
      </p>
      <p
        v-else
        class="text-sm font-light"
      >
        {{ startDate }}
      </p>
    </div>
  </NuxtLink>
</template>
