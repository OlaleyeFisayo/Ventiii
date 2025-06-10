export function useImageFieldValidator(
  items: Readonly<Ref<AppFormItems[]>>,
) {
  const hasImageField = computed(() =>
    items.value?.some((i: AppFormItems) => i.type === "img"),
  );
  const isImageValid = computed(() => {
    if (!hasImageField.value)
      return true;
    const imgValue = items.value?.find((i: AppFormItems) => i.type === "img")?.value;
    return Array.isArray(imgValue) && imgValue.length > 0;
  });

  if (hasImageField.value && !isImageValid.value)
    return true;
}
