<script setup lang="ts">
import type {
  DropdownMenuItem,
} from "@nuxt/ui";

import {
  isEqual,
} from "lodash";

const enableSpeakers = ref(false);

const speakers = ref([]);

const addSpeakerModal = ref(false);
function addSpeakerModalToggle() {
  addSpeakerModal.value = !addSpeakerModal.value;
}

const defaultSpeakerForm: AppFormItems[] = [
  {
    tag: "name",
    type: "text",
    value: "",
    placeholder: "Enter Speaker's name",
  },
  {
    tag: "title",
    type: "text",
    value: "",
    optional: true,
    placeholder: "Enter Speaker's title",
  },
  {
    tag: "company",
    type: "text",
    value: "",
    optional: true,
    placeholder: "Enter Speaker's company",
  },
  {
    tag: "bio",
    type: "textarea",
    value: "",
    optional: true,
    placeholder: "Enter Speaker's bio",
  },
  {
    label: "Image",
    tag: "image",
    type: "img",
    value: [],
    maxFile: 1,
    maxFileSize: 1 * 1024 * 1024,
  },
];
const speakerDetailForm = ref<AppFormItems[]>(structuredClone(defaultSpeakerForm));
const defaultSocial: any[] = [];
const socials = ref<any[]>(structuredClone(defaultSocial));

function addSpeakertoEvent() {
  speakerDetailForm.value = defaultSpeakerForm;
  socials.value = defaultSocial;
}

const editSpeakerModal = ref(false);
const selectedSpeakerIndex = ref<number>(0);
const selectedSpeaker = ref<any>(null);
const selectedSpeakerImage = ref([]);
function toggleEditModal(index: number) {
  editSpeakerModal.value = !editSpeakerModal.value;
  selectedSpeakerIndex.value = index;
  selectedSpeaker.value = {
    ...speakers.value[index],
  };
}

function speakerDropdownMenu(index: number): DropdownMenuItem[] {
  return [
    {
      label: "Edit",
      icon: "i-tabler-pencil",
      onSelect: () => {
        toggleEditModal(index);
      },
    },
    {
      label: "Delete",
      icon: "i-tabler-trash",
      color: "error",
    },
  ];
};

const errorMessage = ref("");
const isSpeakerDetailChanged = computed(() => {
  const isOldName = speakers.value[selectedSpeakerIndex.value].name === selectedSpeaker.value.name;
  const isOldTitle = speakers.value[selectedSpeakerIndex.value].title === selectedSpeaker.value.title;
  const isOldCompany = speakers.value[selectedSpeakerIndex.value].company === selectedSpeaker.value.company;
  const isOldBio = speakers.value[selectedSpeakerIndex.value].bio === selectedSpeaker.value.bio;
  const isOldImage = selectedSpeakerImage.value.length === 0;
  const isOldSocials = isEqual(
    speakers.value[selectedSpeakerIndex.value].socialLinks,
    selectedSpeaker.value.socialLinks,
  );
  if (isOldName && isOldTitle && isOldCompany && isOldBio && isOldBio && isOldImage && isOldSocials) {
    setErrorMessage(
      errorMessage,
      "Looks like nothing was changed. Please update at least one detail before submitting.",
    );
    return false;
  }
  return true;
});

async function updateSpeaker() {
  if (!isSpeakerDetailChanged.value)
    return false;
}
</script>

<template>
  <section class="flex flex-col gap-4">
    <div>
      <h1 class="text-2xl text-black font-bold">
        Event Speakers
      </h1>
    </div>
    <AppCard>
      <AppSwitch
        v-model="enableSpeakers"
        label="Add Speakers to event"
        description="you add speakers to your event"
      />
    </AppCard>
    <AppCard v-if="enableSpeakers">
      <section class="flex flex-col gap-4">
        <div class="flex justify-end gap-2">
          <AppTooltip text="Add a speaker">
            <AppButton
              icon="i-tabler-user-plus"
              @click="addSpeakerModalToggle"
            />
          </AppTooltip>
          <AppTooltip text="Delete all speakers">
            <AppButton
              v-if="speakers.length > 1"
              icon="i-tabler-trash"
              color="error"
              @click="addSpeakerModalToggle"
            />
          </AppTooltip>
        </div>
        <h1 v-if="speakers.length === 0">
          No Speaker found
        </h1>
        <div
          v-else
          class="flex flex-col gap-2"
        >
          <AppCard
            v-for="(speaker, index) in speakers"
            :key="speaker.name"
          >
            <div class="flex gap-2 items-center justify-between">
              <div class="flex gap-2">
                <NuxtImg
                  :width="50"
                  :src="speaker.image"
                  :alt="`${speaker.name} image`"
                  class="rounded-xl"
                />
                <div>
                  <h1>{{ speaker.name }}</h1>
                  <p class="text-muted text-sm">
                    {{ speaker.title }}
                  </p>
                </div>
              </div>
              <AppDropdownMenu :items="speakerDropdownMenu(index)">
                <AppButton
                  variant="link"
                  icon="i-tabler-dots-vertical"
                />
              </AppDropdownMenu>
            </div>
          </AppCard>
        </div>
      </section>
    </AppCard>

    <AppModal
      v-model:open="addSpeakerModal"
      title="Speaker Detail"
    >
      <template #body>
        <AppForm
          v-model:items="speakerDetailForm"
          submit-label="Add Speaker"
          @submit="addSpeakertoEvent"
        >
          <EventSocialLinksMenu v-model="socials" />
        </AppForm>
      </template>
    </AppModal>

    <AppModal
      v-model:open="editSpeakerModal"
      title="Edit Speaker Detail"
    >
      <template #body>
        <div class="flex flex-col gap-3">
          <AppAlert
            v-if="errorMessage"
            color="error"
            class="w-full mx-auto mt-2"
            title="Error"
            icon="i-tabler-info-square-rounded-filled"
            :description="errorMessage"
          />
          <AppFormField label="Name">
            <AppInput v-model="selectedSpeaker.name" />
          </AppFormField>
          <AppFormField label="Title">
            <AppInput v-model="selectedSpeaker.title" />
          </AppFormField>
          <AppFormField label="Company">
            <AppInput v-model="selectedSpeaker.company" />
          </AppFormField>
          <AppFormField label="Bio">
            <AppTextarea v-model="selectedSpeaker.bio" />
          </AppFormField>
          <AppFormField label="Image">
            <div
              class="mb-2"
            >
              <h1>Current Image: </h1>
              <NuxtImg
                :alt="speakers[selectedSpeakerIndex].name"
                :width="50"
                :src="`${selectedSpeaker.image} image`"
                class="rounded-xl"
              />
            </div>
            <AppImageDnd
              v-model="selectedSpeakerImage"
              :max-files="1"
              :max-file-size="1 * 1024 * 1024"
            />
          </AppFormField>
          <EventSocialLinksMenu v-model="selectedSpeaker.socialLinks" />
          <AppButton
            label="Update"
            class="flex items-center justify-center"
            @click="updateSpeaker"
          />
        </div>
      </template>
    </AppModal>
  </section>
</template>
