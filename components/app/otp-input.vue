<script setup lang="ts">
defineProps({
  disabled: Boolean,
});

const model = defineModel({
  default: [],
});

const defaultTime = 300;
const timeLeft = ref(defaultTime);
const isButtonDisabled = ref(true);
let timer: any;

function startTimer() {
  clearInterval(timer);
  timeLeft.value = defaultTime;
  isButtonDisabled.value = true;

  timer = setInterval(() => {
    if (timeLeft.value > 0) {
      timeLeft.value--;
    }
    else {
      clearInterval(timer);
      isButtonDisabled.value = false;
    }
  }, 1000);
}

const formattedTimeLeft = computed(() => {
  const minutes = Math.floor(timeLeft.value / 60).toString().padStart(2, "0");
  const seconds = (timeLeft.value % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
});

function handleResend() {
  startTimer();
}

onMounted(() => {
  startTimer();
});
</script>

<template>
  <div>
    <UPinInput
      v-model="model"
      type="number"
      :disabled="disabled"
      otp
      :length="6"
      size="xl"
      :ui="{
        base: 'w-full',
      }"
    />
    <p>
      Didn't get any code?
      <AppButton
        label="send another"
        variant="link"
        :disabled="isButtonDisabled"
        @click="handleResend"
      />
      <span v-if="isButtonDisabled" class="text-sm text-gray-500">
        (Wait {{ formattedTimeLeft }})
      </span>
    </p>
  </div>
</template>
