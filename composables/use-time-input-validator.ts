export function useTimeInputValidator(
  items: Readonly<Ref<AppFormItems[]>>,
  state: Readonly<Ref<Record<string, any>>>,
) {
  const hasTimeField = computed(() =>
    items.value?.some((i: AppFormItems) => i.type === "time"),
  );
  const isTimeValid = computed(() => {
    if (!hasTimeField.value)
      return true;
    const timeValue = state.value.time;
    return (
      timeValue != null
      && typeof timeValue.start === "string" && timeValue.start.trim() !== ""
      && typeof timeValue.end === "string" && timeValue.end.trim() !== ""
    );
  });

  if (hasTimeField.value && !isTimeValid.value)
    return true;
}
