export function useParseTimeToMinutes(t: string): number | null {
  const m = t.match(/^(\d\d):(\d\d)$/);
  if (!m)
    return null;
  const hh = Number(m[1]);
  const mm = Number(m[2]);
  if (hh > 23 || mm > 59)
    return null;
  return hh * 60 + mm;
}
