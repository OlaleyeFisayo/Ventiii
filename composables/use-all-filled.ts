export function useAllFilled(state: Record<string, any>, items: AppFormItems[]) {
  return items.every((item) => {
    if (item.optional)
      return true;

    const value = state[item.tag];

    if (item.type === "time") {
      return value?.start?.trim() && value?.end?.trim();
    }

    if (item.type === "img") {
      return Array.isArray(value) && value.length > 0;
    }

    return value !== undefined && value !== null && String(value).trim() !== "";
  });
}
