import {
  CalendarDate,
} from "@internationalized/date";

export function useConvertToCalendarDate(d: string | number) {
  const date = new Date(d);
  const calendar = new CalendarDate(
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate(),
  );

  return calendar;
}
