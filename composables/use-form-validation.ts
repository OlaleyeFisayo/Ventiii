import type {
  ModelRef,
} from "vue";

export function useFormValidation(
  items: Readonly<ModelRef<AppFormItems[]>>,
  state: Readonly<Ref<Record<string, any>>>,
  score: Readonly<Ref<number>>,
) {
  const isAllFilled = computed(() => useAllFilled(
    state.value,
    items.value,
  ));
  const isPasswordValidated = computed(() => usePasswordFormValidator(
    items,
    state,
    score,
  ));
  const isOtpValdated = computed(() => useOtpValidator(
    items,
    state,
  ));
  const isTimeInputValidated = computed(() => useTimeInputValidator(
    items,
    state,
  ));
  const isImageFieldValidated = computed(() => useImageFieldValidator(items));

  if (
    !isAllFilled.value
    || isPasswordValidated.value
    || isOtpValdated.value
    || isTimeInputValidated.value
    || isImageFieldValidated.value
  ) {
    return true;
  }
  return false;
}
