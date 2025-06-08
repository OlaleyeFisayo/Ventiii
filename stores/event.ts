import type {
  FetchError,
} from "ofetch";

export const useEventStore = defineStore("useEventStore", () => {
  const {
    errorToast,
  } = useAppToast();
  const {
    $csrfFetch,
  } = useNuxtApp();

  const loading = ref(false);
  const success = ref(false);

  async function createEvent(payload: {
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    startTime: string;
    endTime: string;
    location: string;
    coverPictureUrl: string;
  }) {
    try {
      loading.value = true;
      success.value = false;

      await $csrfFetch("/api/event", {
        method: "post",
        body: payload,
      });

      success.value = true;
    }
    catch (e) {
      loading.value = false;
      const error = e as FetchError;
      errorToast(error.statusMessage || "An unknown issue occured");
    }
    finally {
      loading.value = false;
    }
  }

  return {
    createEvent,
    loading,
    success,
  };
});
