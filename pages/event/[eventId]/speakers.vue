<script setup lang="ts">
import type {
  DropdownMenuItem,
} from "@nuxt/ui";

import {
  isEqual,
} from "lodash";

const route = useRoute();
const eventId = route.params.eventId;
const eventStore = useEventStore();
const cloudinaryStore = useCloudinaryStore();
const speakerStore = useSpeakerStore();

const enableSpeakers = computed({
  get() {
    return eventStore.event?.hasSpeakers;
  },
  async set() {
    await eventStore.updateEvent(
      eventId as string,
      {
        hasSpeakers: !eventStore.event?.hasSpeakers,
      },
    );
  },
});

const speakers = computed(() => speakerStore.speakers);
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
const defaultSocial: any = {};
const socials = ref<any>(structuredClone(defaultSocial));

async function addSpeakertoEvent(state: {
  name: string;
  title?: string;
  company?: string;
  bio?: string;
  image: File[];
}) {
  const {
    url,
  } = await cloudinaryStore.upload(state.image[0] as File);
  if (cloudinaryStore.success) {
    const payload = {
      ...state,
      socialLinks: socials.value,
      image: url,
    };

    await speakerStore.createSpeaker(
      eventId as string,
      payload,
    );

    if (speakerStore.success) {
      speakerDetailForm.value = defaultSpeakerForm;
      socials.value = defaultSocial;
      addSpeakerModalToggle();
    }
  }
}

const editSpeakerModal = ref(false);
const selectedSpeakerIndex = ref<number>(0);
const selectedSpeaker = ref<any>(null);
const selectedSpeakerImage = ref([]);
function toggleEditModal() {
  editSpeakerModal.value = !editSpeakerModal.value;
}

function speakerDropdownMenu(index: number): DropdownMenuItem[] {
  selectedSpeakerIndex.value = index;
  selectedSpeaker.value = {
    ...speakers.value[index],
  };
  return [
    {
      label: "Edit",
      icon: "i-tabler-pencil",
      onSelect: () => {
        toggleEditModal();
      },
    },
    {
      label: "Delete",
      icon: "i-tabler-trash",
      color: "error",
      onSelect: async () => {
        await Promise.all([
          isMyCloudinaryUrl(selectedSpeaker.value.image),
          speakerStore.deleteSpeaker(selectedSpeaker.value.id),
        ]);
        await speakerStore.getSpeakers(eventId as string);
      },
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
    return;

  const updateData = {
    name: selectedSpeaker.value.name,
    title: selectedSpeaker.value.title ?? null,
    company: selectedSpeaker.value.company ?? null,
    bio: selectedSpeaker.value.bio ?? null,
    socialLinks: selectedSpeaker.value.socialLinks ?? null,
  };

  const uploadPromises = [];

  if (selectedSpeakerImage.value.length !== 0) {
    uploadPromises.push(Promise.all([
      isMyCloudinaryUrl(selectedSpeaker.value.image),
      cloudinaryStore.upload(selectedSpeakerImage.value[0]),
    ]).then(([, uploadResult]) => {
      updateData.image = uploadResult.url;
      selectedSpeakerImage.value = [];
    }));
  }

  if (uploadPromises.length > 0) {
    await Promise.all(uploadPromises);
  }

  await speakerStore.updateSpeaker(
    Number.parseInt(selectedSpeaker.value.id),
    updateData,
  );

  if (speakerStore.success) {
    await speakerStore.getSpeakers(eventId as string);
    toggleEditModal();
  }
}

async function deleteAllSpeakers() {
  await speakerStore.deleteSpeakers(eventId as string);
  await Promise.all([
    speakers.value.map(async speaker => isMyCloudinaryUrl(speaker.image)),
  ]);
  await speakerStore.getSpeakers(eventId as string);
}

onMounted(async () => {
  if (eventStore.event?.hasSpeakers) {
    await speakerStore.getSpeakers(eventId as string);
  }
});
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
        label="Add Event Speakers"
        description="Turn on this feature to include and showcase speakers for your event."
      />
    </AppCard>
    <AppSkeleton
      v-if="eventStore.loading"
      class="w-full h-30"
    />
    <AppCard v-if="enableSpeakers && !eventStore.loading">
      <template v-if="speakerStore.loading">
        <AppSkeleton
          v-for="i in 2"
          :key="i"
          class="w-full h-10"
        />
      </template>
      <section
        v-else
        class="flex flex-col gap-4"
      >
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
              @click="deleteAllSpeakers"
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
                  class="rounded-full"
                />
                <div class="flex flex-col justify-center">
                  <h1>{{ speaker.name }}</h1>
                  <p
                    v-if="speaker.title"
                    class="text-muted text-sm"
                  >
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
      :loading="eventStore.loading || cloudinaryStore.loading"
    >
      <template #body>
        <AppForm
          v-model:items="speakerDetailForm"
          submit-label="Add Speaker"
          :loading="eventStore.loading || cloudinaryStore.loading"
          @submit="addSpeakertoEvent"
        >
          <EventSocialLinksMenu v-model="socials" />
        </AppForm>
      </template>
    </AppModal>

    <AppModal
      v-model:open="editSpeakerModal"
      title="Edit Speaker Detail"
      :loading="speakerStore.loading || cloudinaryStore.loading"
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
            <AppInput
              v-model="selectedSpeaker.name"
              placeholder="Enter Speaker's name"
              :disabled="speakerStore.loading || cloudinaryStore.loading"
            />
          </AppFormField>
          <AppFormField label="Title">
            <AppInput
              v-model="selectedSpeaker.title"
              placeholder="Enter Speaker's title"
              :disabled="speakerStore.loading || cloudinaryStore.loading"
            />
          </AppFormField>
          <AppFormField label="Company">
            <AppInput
              v-model="selectedSpeaker.company"
              placeholder="Enter Speaker's company"
              :disabled="speakerStore.loading || cloudinaryStore.loading"
            />
          </AppFormField>
          <AppFormField label="Bio">
            <AppTextarea
              v-model="selectedSpeaker.bio"
              placeholder="Enter Speaker's bio"
              :disabled="speakerStore.loading || cloudinaryStore.loading"
            />
          </AppFormField>
          <AppFormField label="Image">
            <div
              class="mb-2"
            >
              <h1>Current Image: </h1>
              <NuxtImg
                :alt="`${speakers[selectedSpeakerIndex].name} image`"
                :width="100"
                :src="selectedSpeaker.image"
                class="rounded-full"
              />
            </div>
            <AppImageDnd
              v-model="selectedSpeakerImage"
              :max-files="1"
              :max-file-size="1 * 1024 * 1024"
              :disabled="speakerStore.loading || cloudinaryStore.loading"
            />
          </AppFormField>
          <EventSocialLinksMenu v-model="selectedSpeaker.socialLinks" />
          <AppButton
            label="Update"
            class="flex items-center justify-center"
            :loading="speakerStore.loading || cloudinaryStore.loading"
            @click="updateSpeaker"
          />
        </div>
      </template>
    </AppModal>
  </section>
</template>
