<script setup lang="ts">
const props = defineProps({
  type: {
    type: String,
    default: "text",
  },
  placeholder: String,
  class: String,
  max: String,
  min: String,
  accept: String,
  baseClass: String,
  rootClass: String,
});

const emit = defineEmits(["update:modelValue", "keyup"]);

const model = defineModel<any>();

function onFileChange(event: Event) {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0] ?? null;
  emit("update:modelValue", file);
}

function onKeyup(e: KeyboardEvent) {
  emit("keyup", e);
}
</script>

<template>
  <UInput
    v-if="type === 'file'"
    type="file"
    :accept="accept"
    :ui="{
      trailing: 'pe-1',
      root: `w-full ${rootClass}`,
      base: `p-4 bg-inherit text-black ${baseClass}`,
    }"
    @change="onFileChange"
  />

  <UInput
    v-else
    v-model="model"
    :type="type"
    :placeholder="placeholder"
    :class="[props.class]"
    :max="max"
    :min="min"
    :ui="{
      trailing: 'pe-1',
      root: `w-full ${rootClass}`,
      base: `p-4 bg-inherit ${baseClass}`,
    }"
    @keyup="onKeyup"
  >
    <template #trailing>
      <slot name="trailing" />
    </template>
  </UInput>
</template>
