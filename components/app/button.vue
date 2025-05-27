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
});

const emits = defineEmits(["click"]);

function handleClick(event: Event) {
  emits("click", event);
}
</script>

<template>
  <UButton
    class="cursor-pointer"
    :class="[
      props.class,
      theme === 'secondary' ? 'bg-slate-200 text-black hover:bg-slate-100' : '',
    ]"
    :label="label"
    :to="to"
    :variant="variant"
    :icon="icon"
    :size="size"
    :disabled="disabled"
    :trailing-icon="trailingIcon"
    :type="type"
    @click="handleClick"
  >
    <slot />
  </UButton>
</template>
