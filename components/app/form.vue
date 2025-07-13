<script setup lang="ts">
import type {
  FormSubmitEvent,
} from "@nuxt/ui";

defineProps({
  submitLabel: String,
  loading: Boolean,
  disabled: Boolean,
  showHints: {
    type: Boolean,
    default: true,
  },
});

const emits = defineEmits(["submit"]);

const items = defineModel<AppFormItems[]>("items");

// show passard state
const showPassword = ref(false);

// State for Uform
const state = computed<Record<string, any>>(() =>
  Object.fromEntries(items.value!.map((i: AppFormItems) => [i.tag, i.value])));

// Secure password check
const strength = computed(() => useCheckPasswordStrength(state.value?.password));
const score = computed(() => strength.value.filter((req: any) => req.met).length);
const color = computed<any | ComponentColor>(() => {
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

// check if submitting is disabled
const isSubmitDisabled = computed(() => useFormValidation(
  items,
  state,
  score,
));

// Handling submits
type Schema = ReturnType<typeof state>;

function handleSubmit(event: FormSubmitEvent<Schema>) {
  emits(
    "submit",
    event.data,
  );
}

// THis is to check whether the form is filled or not
const isDirty = computed(() => {
  return Object.values(state.value).some((val) => {
    if (Array.isArray(val)) {
      return val.length > 0;
    }
    if (val && typeof val === "object" && "start" in val && "end" in val)
      return val.start?.trim?.() || val.end?.trim?.();
    return typeof val === "string"
      ? val.trim().length > 0
      : val != null;
  });
});

const isDirtyModel = defineModel<boolean>(
  "isDirty",
  {
    local: true,
    default: false,
  },
);

watch(
  isDirty,
  (val: boolean) => {
    isDirtyModel.value = val;
  },
);
</script>

<template>
  <UForm
    :state="state"
    @submit="handleSubmit"
  >
    <div class="flex flex-col gap-2">
      <AppFormField
        v-for="item in items"
        :key="item.tag"
        :name="item.tag"
        :label="item?.label ?? item.tag"
        :required="showHints && !item?.optional"
        :optional="showHints && item?.optional"
      >
        <AppImageDnd
          v-if="item.type === 'img'"
          v-model="item.value"
          :max-files="item.maxFile"
          :max-file-size="item.maxFileSize"
          :disabled="loading"
        />
        <AppTime
          v-else-if="item.type === 'time'"
          v-model:start="item.value.start"
          v-model:end="item.value.end"
          :disabled="loading"
        />
        <AppDateRangePicker
          v-else-if="item.type === 'date'"
          v-model="item.value"
          :disabled="loading"
        />
        <AppTextarea
          v-else-if="item.type === 'textarea'"
          v-model="item.value"
          :disabled="loading"
          :placeholder="item?.placeholder ?? `Enter your ${item.tag}`"
        />
        <AppOtpInput
          v-else-if="item.type === 'otp'"
          v-model="item.value"
          :disabled="loading"
        />
        <AppInput
          v-else
          v-model="item.value"
          :placeholder="item?.placeholder ?? `Enter your ${item.tag}`"
          :type="item.type === 'password'
            ? (showPassword ? 'text' : 'password')
            : item.type"
          :disabled="loading"
          :icon="item.icon"
          :base-class="item.icon ? 'pl-9' : ''"
        >
          <template
            v-if="item.type === 'password'"
            #trailing
          >
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
          <p
            id="password-strength"
            class="text-sm font-medium text-black mt-1"
          >
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
