<script setup lang="ts">
defineProps({
  submitLabel: String,
});

const items = defineModel<AppFormItems[]>("items");

// show passard statr
const showPassword = ref(false);

// State for Uform
const state = computed(() =>
  items.value?.reduce((acc: any, item: AppFormItems) => {
    acc[item.tag] = item.value;
    return acc;
  }, {
  } as Record<string, any>),
);

// Secure password check
const strength = computed(() => checkStrength(state.value?.password));
const score = computed(() => strength.value.filter((req: any) => req.met).length);
const color = computed(() => {
  if (score.value === 0)
    return "neutral";
  if (score.value <= 1)
    return "error";
  if (score.value <= 2)
    return "warning";
  if (score.value === 3)
    return "warning";
  return "success";
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

function checkStrength(str: string) {
  const requirements = [
    {
      regex: /.{8,}/,
      text: "At least 8 characters",
    },
    {
      regex: /\d/,
      text: "At least 1 number",
    },
    {
      regex: /[a-z]/,
      text: "At least 1 lowercase letter",
    },
    {
      regex: /[A-Z]/,
      text: "At least 1 uppercase letter",
    },
  ];

  return requirements.map(req => ({
    met: req.regex.test(str),
    text: req.text,
  }));
}

// Check if Form is filled up
const isAllFilled = computed(() => useAllFilled(state.value));

// check if submitting is disabled
const isSubmitDisabled = computed(() => {
  if (!isAllFilled.value)
    return true;

  const pwItem = items.value?.find((i: AppFormItems) => i.tag === "password" && i.securePassword);
  if (pwItem && score.value < 4)
    return true;

  return false;
});
</script>

<template>
  <UForm :state="state">
    <div class="flex flex-col gap-2">
      <AppFormField
        v-for="item in items"
        :key="item.tag"
        :name="item.tag"
        :label="item.tag"
      >
        <AppInput
          v-if="item.type !== 'password'"
          v-model="item.value"
          :placeholder="item?.placeholder ?? `Enter your ${item.tag}`"
          :type="item.type"
        />
        <AppInput
          v-else
          v-model="item.value"
          :placeholder="item?.placeholder ?? `Enter your ${item.tag}`"
          :type="showPassword ? 'text' : 'password'"
        >
          <template #trailing>
            <AppButton
              variant="link"
              size="xl"
              :icon="showPassword ? 'i-tabler-eye-closed' : 'i-tabler-eye'"
              :aria-label="showPassword ? 'Hide password' : 'Show password'"
              :aria-pressed="showPassword"
              aria-controls="password"
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
      class="w-full flex items-center justify-center mt-6 p-3"
      :disabled="isSubmitDisabled"
    />
  </UForm>
</template>
