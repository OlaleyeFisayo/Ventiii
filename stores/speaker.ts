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
      const result = await execute(() => $csrfFetch(
        `/api/speaker/${eventId}`,
        {
          method: "post",
          body: payload,
        },
      )) as GetSpeakerResponse[];

      if (success.value) {
        speakers.value = result;
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

    return {
      createSpeaker,
      loading,
      success,
      speakers,
      getSpeakers,
    };
  },
);
