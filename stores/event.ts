import type {
  GetEventFilterOptions,
} from "~/shared/types/event";

export const useEventStore = defineStore(
  "useEventStore",
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
    const eventsData = ref<GetEventsResponse | null>(null);
    const event = ref<GetEventResponse | null>(null);

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
      await execute(() => $csrfFetch(
        "/api/event",
        {
          method: "post",
          body: payload,
        },
      ));
    }

    async function getEvents(
      filter: GetEventFilterOptions = "all",
      page: number = 1,
      limit: number = 10,
      search?: string,
    ) {
      const data = await execute(() => $csrfFetch(
        `/api/events?filter=${filter}&page=${page}&limit=${limit}${search ? `&search=${search}` : ""}`,
        {
          method: "get",
        },
      )) as GetEventsResponse;

      if (success.value) {
        eventsData.value = data;
      }
    }

    async function getEvent(eventId: string) {
      const data = await execute(() => $csrfFetch(
        `/api/event/${eventId}`,
        {
          method: "get",
        },
      )) as GetEventResponse;

      if (success.value) {
        event.value = data;
      }
    }

    async function deleteEvent(eventId: string) {
      await execute(() => $csrfFetch(
        `/api/event/${eventId}`,
        {
          method: "delete",
        },
      ));

      if (success.value) {
        await navigateTo("/dashboard");
      }
    }

    async function updateEvent(
      eventId: string,
      data: any,
    ) {
      const {
        data: resultData,
      } = await execute(() => $csrfFetch(
        `/api/event/${eventId}`,
        {
          method: "patch",
          body: data,
        },
      )) as {
        data: GetEventResponse[];
      };

      if (success.value) {
        event.value = resultData[0];
      }
    }

    return {
      createEvent,
      loading,
      success,
      getEvents,
      eventsData,
      getEvent,
      event,
      deleteEvent,
      updateEvent,
    };
  },
);
