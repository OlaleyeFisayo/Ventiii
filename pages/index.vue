<script setup lang="ts">
const registerForm = reactive({
  name: "",
  email: "",
  password: "",
});
const showPassword = ref(false);
const strength = computed(() => checkStrength(registerForm.password));
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
</script>

<template>
  <section class="text-black pt-16 pb-8">
    <h1 class="text-3xl font-bold text-center">
      Sign up
    </h1>
    <section
      class="w-full max-w-[500px] mx-auto mt-4"
    >
      <UForm :state="registerForm">
        <UFormField label="Name" name="name">
          <UInput
            v-model="registerForm.name"
            placeholder="Enter your name"
            type="text"
          />
        </UFormField>
        <UFormField label="Email" name="email">
          <UInput
            v-model="registerForm.email"
            placeholder="Enter your email"
            type="email"
          />
        </UFormField>
        <UFormField label="Password" name="password">
          <UInput
            v-model="registerForm.password"
            placeholder="Enter your password"
            :type="showPassword ? 'text' : 'password'"
          >
            <template #trailing>
              <UButton
                variant="link"
                size="lg"
                :icon="showPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                :aria-label="showPassword ? 'Hide password' : 'Show password'"
                :aria-pressed="showPassword"
                aria-controls="password"
                class="cursor-pointer text-black hover:text-black"
                @click="showPassword = !showPassword"
              />
            </template>
          </UInput>
        </UFormField>
        <UProgress
          :color="color"
          :indicator="text"
          :model-value="score"
          :max="4"
          size="sm"
        />

        <p id="password-strength" class="text-sm font-medium text-black">
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
              :name="req.met ? 'i-lucide-circle-check' : 'i-lucide-circle-x'"
              class="size-4 shrink-0"
            />

            <span class="text-xs font-light">
              {{ req.text }}
              <span class="sr-only">
                {{ req.met ? " - Requirement met" : " - Requirement not met" }}
              </span>
            </span>
          </li>
        </ul>
      </UForm>
    </section>
  </section>
</template>
