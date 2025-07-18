<script setup lang="ts">
defineProps({
  speaker: {
    type: Object as PropType<GetSpeakerResponse>,
    default: () => {},
  },
});

const modal = ref(false);
function showModal() {
  modal.value = !modal.value;
}
</script>

<template>
  <section>
    <AppCard @click="showModal">
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
    </AppCard>
    <AppModal v-model:open="modal">
      <template #content>
        <section class="text-black p-8 flex flex-col gap-4">
          <div class="flex gap-2 w-full">
            <NuxtImg
              :width="70"
              :src="speaker.image"
              :alt="`${speaker.name} image`"
              class="rounded-full"
            />
            <div class="flex flex-col justify-center">
              <h1 class="font-bold text-xl">
                {{ speaker.name }}
              </h1>
              <p
                v-if="speaker.title"
                class="text-muted text-sm"
              >
                {{ speaker.title }}
              </p>
            </div>
          </div>
          <div v-if="speaker.company">
            <h1 class="font-bold">
              Company:
            </h1>
            <p>{{ speaker.company }}</p>
          </div>
          <div v-if="speaker.bio">
            <h1 class="font-bold">
              Bio:
            </h1>
            <p>{{ speaker.bio }}</p>
          </div>
          <div v-if="speaker.socialLinks">
            <h1 class="font-bold">
              Connect with me
            </h1>
            <EventSocialMediaLinks :social-links="speaker.socialLinks" />
          </div>
        </section>
      </template>
    </AppModal>
  </section>
</template>
