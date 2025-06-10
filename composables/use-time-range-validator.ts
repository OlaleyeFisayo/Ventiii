export function useTimeRangeValidator(
  tv: {
    start: string;
    end: string;
  },
) {
  if (!tv?.start || !tv?.end)
    return false;

  const startM = useParseTimeToMinutes(tv.start);
  const endM = useParseTimeToMinutes(tv.end);
  if (startM === null || endM === null)
    return false;

  return endM <= startM;
}
