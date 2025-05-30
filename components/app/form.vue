<script setup lang="ts">
import type {
  FormSubmitEvent,
} from "@nuxt/ui";

defineProps({
  submitLabel: String,
  loading: Boolean,
  disabled: Boolean,
});

const emits = defineEmits(["submit"]);

const items = defineModel<AppFormItems[]>("items");

// show passard statr
const showPassword = ref(false);

// State for Uform
const state = computed(() =>
  Object.fromEntries(items.value!.map((i: AppFormItems) => [i.tag, i.value])),
);

// Secure password check
const strength = computed(() => useCheckPasswordStrength(state.value?.password));
const score = computed(() => strength.value.filter((req: any) => req.met).length);
const color = computed<ComponentColor>(() => {
  return ["neutral", "error", "warning", "warning", "success"][score.value] ?? "neutral";
});

const text = computed(() => {
  if (score.value === 0)
    return "Enter a password";
  if (score.value <= 2)
    return "Weak password";
  if (score.value === 3)
    return "Medium password";
  return "Strong password";
});

// Check if Form is filled up
const isAllFilled = computed(() => useAllFilled(state.value));

// check if submitting is disabled
const hasSecurePassword = computed(() =>
  items.value?.some((i: AppFormItems) => i.tag === "password" && i.securePassword),
);

const hasConfirmPassword = computed(() =>
  items.value?.some((i: AppFormItems) => i.tag === "confirmPassword"),
);

const passwordsMatch = computed(() => {
  const pw = state.value.password;
  const cpw = state.value.confirmPassword;
  return !hasConfirmPassword.value || pw === cpw;
});

const hasOtp = computed(() =>
  items.value?.some((i: AppFormItems) => i.type === "otp"),
);

const isOtpValid = computed(() => {
  const otp = state.value?.otp;
  if (!hasOtp.value)
    return true;
  return Array.isArray(otp)
    && otp.length === 6
    && otp.every(val => typeof val === "string" && val.trim().length > 0);
});

const isSubmitDisabled = computed(() => {
  if (!isAllFilled.value)
    return true;
  if (hasSecurePassword.value && score.value < 4)
    return true;
  if (hasConfirmPassword.value && !passwordsMatch.value)
    return true;
  if (hasOtp.value && !isOtpValid.value)
    return true;
  return false;
});

// Handling submits
type Schema = ReturnType<typeof state>;

function handleSubmit(event: FormSubmitEvent<Schema>) {
  emits("submit", event.data);
}
</script>

<template>
  <UForm :state="state" @submit="handleSubmit">
    <div class="flex flex-col gap-2">
      <AppFormField
        v-for="item in items"
        :key="item.tag"
        :name="item.tag"
        :label="item?.label ?? item.tag"
      >
        <template v-if="item.type === 'otp'">
          <AppOtpInput v-model="item.value" :disabled="loading" />
        </template>
        <AppInput
          v-else
          v-model="item.value"
          :placeholder="item?.placeholder ?? `Enter your ${item.tag}`"
          :type="item.type === 'password'
            ? (showPassword ? 'text' : 'password')
            : item.type"
          :disabled="loading"
        >
          <template v-if="item.type === 'password'" #trailing>
            <AppButton
              variant="link"
              size="xl"
              :icon="showPassword ? 'i-tabler-eye-closed' : 'i-tabler-eye'"
              :aria-label="showPassword ? 'Hide password' : 'Show password'"
              :aria-pressed="showPassword"
              aria-controls="password"
              :disabled="loading"
              @click="showPassword = !showPassword"
            />
          </template>
        </AppInput>
        <template v-if="item?.securePassword">
          <UProgress
            :color="color"
            :indicator="text"
            :model-value="score"
            :max="4"
            size="sm"
            class="mt-2"
          />
          <p id="password-strength" class="text-sm font-medium text-black mt-1">
            {{ text }}. Must contain:
          </p>
          <ul
            class="space-y-1 text-black"
            aria-label="Password requirements"
          >
            <li
              v-for="(req, index) in strength"
              :key="index"
              class="flex items-center gap-0.5"
              :class="req.met ? 'text-success' : 'text-black'"
            >
              <UIcon
                :name="req.met ? 'i-tabler-circle-check' : 'i-tabler-playstation-x'"
                class="size-4 shrink-0"
              />

              <span class="text-xs font-light">
                {{ req.text }}
              </span>
            </li>
          </ul>
        </template>
      </AppFormField>
    </div>

    <slot />

    <AppButton
      :label="submitLabel ?? 'Submit'"
      class="w-full flex items-center justify-center mt-4 p-3"
      :disabled="isSubmitDisabled"
      type="submit"
      loading-auto
      :loading="loading"
    />
  </UForm>
</template>
