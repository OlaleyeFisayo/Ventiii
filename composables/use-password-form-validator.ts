export function usePasswordFormValidator(
  items: Readonly<Ref<AppFormItems[]>>,
  state: Readonly<Ref<Record<string, any>>>,
  score: Readonly<Ref<number>>,
) {
  const hasSecurePassword = computed(() =>
    items.value?.some((i: AppFormItems) => i.tag === "password" && i.securePassword));
  const hasConfirmPassword = computed(() =>
    items.value?.some((i: AppFormItems) => i.tag === "confirmPassword"));

  const passwordsMatch = computed(() => {
    const pw = state.value.password;
    const cpw = state.value.confirmPassword;
    return !hasConfirmPassword.value || pw === cpw;
  });

  if (hasSecurePassword.value && score.value < 4)
    return true;
  if (hasConfirmPassword.value && !passwordsMatch.value)
    return true;
}
