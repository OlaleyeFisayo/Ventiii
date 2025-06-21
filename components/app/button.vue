<script setup lang="ts">
type ButtonType = "button" | "submit" | undefined;

const props = defineProps({
  class: String,
  label: String,
  theme: String,
  to: String,
  variant: {
    type: String as PropType<ComponentVariant>,
  },
  icon: String,
  size: {
    type: String as PropType<ComponentSize>,
  },
  disabled: Boolean,
  trailingIcon: String,
  type: {
    type: String as PropType<ButtonType>,
  },
  loading: Boolean,
  loadingAuto: Boolean,
  color: {
    type: String as PropType<ComponentColor>,
  },
});

const emits = defineEmits(["click"]);

function handleClick(event: Event) {
  emits(
    "click",
    event,
  );
}
</script>

<template>
  <UButton
    class="cursor-pointer"
    :class="[
      props.class,
      theme === 'secondary' ? 'bg-slate-200 disabled:bg-gray-200 text-black hover:bg-slate-300' : '',
    ]"
    :label="label"
    :to="to"
    :variant="variant"
    :icon="icon"
    :size="size"
    :disabled="disabled"
    :trailing-icon="trailingIcon"
    :type="type"
    :loading="loading"
    :loading-auto="loadingAuto"
    :color="color"
    @click="handleClick"
  >
    <slot />
  </UButton>
</template>
