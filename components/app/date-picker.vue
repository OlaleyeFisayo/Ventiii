<script setup lang="ts">
import type {
  CalendarDate as CalendarDateType,
  DateValue,
} from "@internationalized/date";

import {
  DateFormatter,
  getLocalTimeZone,
} from "@internationalized/date";

const df = new DateFormatter(
  "en-US",
  {
    dateStyle: "medium",
  },
);

function isDateUnavailable(date: DateValue) {
  const jsDate = (date as CalendarDateType).toDate(getLocalTimeZone());
  jsDate.setHours(
    0,
    0,
    0,
    0,
  );
  const todayMidnight = new Date();
  todayMidnight.setHours(
    0,
    0,
    0,
    0,
  );
  return jsDate < todayMidnight;
}

const model = defineModel<any>();
</script>

<template>
  <UPopover>
    <AppButton
      color="neutral"
      variant="subtle"
      icon="i-lucide-calendar"
      class="w-full p-2.5"
    >
      {{ model ? df.format(model.toDate(getLocalTimeZone())) : 'Select a date' }}
    </AppButton>

    <template #content>
      <UCalendar
        v-model="model"
        class="p-2"
        :year-controls="false"
        :is-date-unavailable="isDateUnavailable"
      />
    </template>
  </UPopover>
</template>
