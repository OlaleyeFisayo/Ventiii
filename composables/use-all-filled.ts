export function useAllFilled<T extends Record<string, any>>(obj: T) {
  return Object.values(obj).every((val) => {
    if (typeof val === "string") {
      return val.trim().length > 0;
    }
    if (typeof val === "boolean") {
      return val === true;
    }
    return val !== null && val !== undefined;
  });
  ;
}
