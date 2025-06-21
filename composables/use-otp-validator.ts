export function useOtpValidator(
  items: Readonly<Ref<AppFormItems[]>>,
  state: Readonly<Ref<Record<string, any>>>,
) {
  const hasOtp = computed(() =>
    items.value?.some((i: AppFormItems) => i.type === "otp"));
  const isOtpValid = computed(() => {
    const otp = state.value?.otp;
    if (!hasOtp.value)
      return true;
    return Array.isArray(otp)
      && otp.length === 6
      && otp.every(val => typeof val === "string" && val.trim().length > 0);
  });

  if (hasOtp.value && !isOtpValid.value)
    return true;
}
