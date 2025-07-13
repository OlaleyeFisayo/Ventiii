export const useSpeakerStore = defineStore(
  "useSpeakerStore",
  () => {
    const {
      execute,
      loading: apiLoading,
      success: apiSuccess,
    } = useApiCall();
    const {
      $csrfFetch,
    } = useNuxtApp();

    const loading = computed(() => apiLoading.value);
    const success = computed(() => apiSuccess.value);
    const speakers = ref<GetSpeakerResponse[]>([]);

    async function createSpeaker(
      eventId: string,
      payload: CreateSpeakerPayload,
    ) {
      await execute(() => $csrfFetch(
        `/api/speaker/${eventId}`,
        {
          method: "post",
          body: payload,
        },
      ));

      if (success.value) {
        await getSpeakers(eventId);
      }
    }

    async function getSpeakers(eventId: string) {
      const result = await execute(() => $csrfFetch(
        `/api/speaker/${eventId}`,
        {
          method: "get",
        },
      )) as GetSpeakerResponse[];

      if (success.value) {
        speakers.value = result;
      }
    }

    async function deleteSpeaker(speakerId: number) {
      await execute(() => $csrfFetch(
        `/api/speaker/${speakerId}`,
        {
          method: "delete",
        },
      ));
    }

    async function updateSpeaker(
      speakerId: number,
      data: any,
    ) {
      await execute(() => $csrfFetch(
        `/api/speaker/${speakerId}`,
        {
          method: "patch",
          body: data,
        },
      ));
    }

    return {
      createSpeaker,
      loading,
      success,
      speakers,
      getSpeakers,
      deleteSpeaker,
      updateSpeaker,
    };
  },
);
