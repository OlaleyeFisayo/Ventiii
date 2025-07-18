<script setup lang="ts">
const props = defineProps({
  messages: {
    type: Array as PropType<string[]>,
    required: true,
  },
  typingSpeed: {
    type: Number,
    default: 100,
  },
  delayBetween: {
    type: Number,
    default: 2000,
  },
  loop: {
    type: Boolean,
    default: true,
  },
  class: String,
});

const displayedText = ref("");
const showCursor = ref(true);
let currentMessage = 0;

async function typeMessage(message: string) {
  displayedText.value = "";
  for (let i = 0; i < message.length; i++) {
    displayedText.value += message[i];
    await new Promise(r => setTimeout(
      r,
      props.typingSpeed,
    ));
  }
  await new Promise(r => setTimeout(
    r,
    props.delayBetween,
  ));
}

async function startTyping() {
  while (true) {
    await typeMessage(props.messages[currentMessage]);
    currentMessage = (currentMessage + 1) % props.messages.length;
    if (!props.loop && currentMessage === 0)
      break;
  }
}

onMounted(() => {
  startTyping();
  setInterval(
    () => {
      showCursor.value = !showCursor.value;
    },
    500,
  );
});
</script>

<template>
  <div class="w-full font-semibold h-fit">
    <span :class="props.class">{{ displayedText }}</span><span
      v-if="showCursor"
      :class="props.class"
      class="animate-blink"
    >|</span>
  </div>
</template>

<style scoped>
.animate-blink {
  animation: blink 1s steps(2, start) infinite;
}

@keyframes blink {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}
</style>
