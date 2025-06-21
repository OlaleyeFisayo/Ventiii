export function useFormatShortDate(input: Date | number | string): string {
  const date = typeof input === "string" || typeof input === "number"
    ? new Date(input)
    : input;

  return new Intl.DateTimeFormat(
    "en-US",
    {
      month: "short",
      day: "numeric",
      year: "numeric",
    },
  ).format(date);
}
