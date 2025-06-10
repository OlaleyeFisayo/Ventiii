import type {
  CalendarDate,
} from "@internationalized/date";

export function useAreDatesSame(
  a: CalendarDate | null,
  b: CalendarDate | null,
): boolean {
  if (!a || !b)
    return false;
  return (
    a.year === b.year
    && a.month === b.month
    && a.day === b.day
  );
}
