<script setup lang="ts">
import {
  onMounted,
  ref,
  watch,
} from "vue";

const props = defineProps<{
  modelValue: Record<string, string>;
}>();

const emit = defineEmits(["update:modelValue"]);

const items = [
  "LinkedIn",
  "Facebook",
  "WhatsApp",
  "Twitter / X",
  "Instagram",
  "YouTube",
  "TikTok",
  "Website",
  "GitHub",
  "Behance",
  "Dribbble",
  "Medium",
  "Personal Blog",
];

// Convert the object format to array format for easier manipulation
const socialLinks = ref<{ type: string; url: string }[]>([]);

// Initialize socialLinks from props only once
function initializeSocialLinks() {
  socialLinks.value = Object.entries(props.modelValue || {}).map(([type, url]) => ({
    type,
    url,
  }));
}

// Initialize on mount
onMounted(() => {
  initializeSocialLinks();
});

// Watch for changes in local state and emit to parent
watch(
  socialLinks,
  (val) => {
    const formatted = val
      .filter(entry => entry.url.trim() !== "")
      .reduce(
        (
          acc,
          entry,
        ) => {
          acc[entry.type] = entry.url;
          return acc;
        },
        {} as Record<string, string>,
      );

    emit(
      "update:modelValue",
      formatted,
    );
  },
  {
    deep: true,
  },
);

// Add new social link
function addSocialLink() {
  // Find the first item that's not already used
  const usedTypes = socialLinks.value.map(link => link.type);
  const availableType = items.find(item => !usedTypes.includes(item)) || items[0];

  socialLinks.value.push({
    type: availableType,
    url: "",
  });
}

// Remove social link
function removeSocialLink(index: number) {
  socialLinks.value.splice(
    index,
    1,
  );
}
</script>

<template>
  <section class="mt-2 flex flex-col gap-1">
    <div class="text-black flex items-center gap-2 justify-between">
      <h1>Social Links</h1>
      <AppButton
        icon="i-tabler-plus"
        class="p-0.5"
        @click="addSocialLink"
      />
    </div>

    <div
      v-for="(entry, i) in socialLinks"
      :key="i"
      class="flex justify-between gap-1"
    >
      <UInputMenu
        v-model="entry.type"
        :items="items"
        :ui="{ base: 'p-2.5 w-30' }"
      />
      <AppInput
        v-model="entry.url"
        placeholder="Enter link"
      />
      <AppButton
        icon="i-tabler-trash"
        color="error"
        @click="removeSocialLink(i)"
      />
    </div>
  </section>
</template>
