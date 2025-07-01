<script setup lang="ts">
import type {
  CalendarDate as CalendarDateType,
  DateValue,
} from "@internationalized/date";

import {
  CalendarDate,
  DateFormatter,
  getLocalTimeZone,
} from "@internationalized/date";

defineProps({
  disabled: Boolean,
});

const model = defineModel<any>();

const df = new DateFormatter(
  "en-US",
  {
    dateStyle: "medium",
  },
);

const todayJs = new Date();
const start = new CalendarDate(
  todayJs.getFullYear(),
  todayJs.getMonth() + 1,
  todayJs.getDate(),
);

const futureJs = new Date();
futureJs.setDate(futureJs.getDate() + 10);
const end = new CalendarDate(
  futureJs.getFullYear(),
  futureJs.getMonth() + 1,
  futureJs.getDate(),
);

const defaultValue = shallowRef({
  start,
  end,
});

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

const isSameDay = computed(() =>
  useAreDatesSame(
    model.value.start,
    model.value.end,
  ));
</script>

<template>
  <UPopover>
    <AppButton
      color="neutral"
      variant="subtle"
      icon="i-tabler-calendar-event-filled"
      class="w-full p-2.5"
      :disabled="disabled"
    >
      <template v-if="model?.start">
        <template v-if="model?.end">
          <template v-if="isSameDay">
            {{ df.format(model?.start.toDate(getLocalTimeZone())) }}
          </template>
          <template v-else>
            {{ df.format(model?.start.toDate(getLocalTimeZone())) }} - {{ df.format(model?.end.toDate(getLocalTimeZone())) }}
          </template>
        </template>

        <template v-else>
          {{ df.format(model?.start.toDate(getLocalTimeZone())) }}
        </template>
      </template>
      <template v-else>
        Pick a date (s)
      </template>
    </AppButton>

    <template #content>
      <UCalendar
        v-model="model"
        class="p-2"
        range
        :year-controls="false"
        :default-value="defaultValue"
        :is-date-unavailable="isDateUnavailable"
      />
    </template>
  </UPopover>
</template>
