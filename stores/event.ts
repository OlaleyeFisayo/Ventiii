export const useEventStore = defineStore("useEventStore", () => {
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
  const events = ref<GetEventsResponse[]>([]);

  async function createEvent(payload: {
    title: string;
    description: string;
    startDate: number;
    endDate: number;
    startTime: string;
    endTime: string;
    location: string;
    coverPictureUrl: string;
  }) {
    await execute(() => $csrfFetch("/api/event", {
      method: "post",
      body: payload,
    }));
  }

  async function getEvents(filter: GetEventFilterOptions = "all") {
    const data = await execute(() => $csrfFetch(`/api/events?filter=${filter}`, {
      method: "get",
    })) as GetEventsResponse[];

    if (success.value) {
      events.value = data;
    }
  }

  return {
    createEvent,
    loading,
    success,
    getEvents,
    events,
  };
});
