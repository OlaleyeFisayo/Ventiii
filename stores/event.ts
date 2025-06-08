import type {
  FetchError,
} from "ofetch";

export const useEventStore = defineStore("useEventStore", () => {
  const {
    errorToast,
  } = useAppToast();

  const loading = ref(true);

  async function createEvent(payload: CreateEventPayload) {
    try {
      loading.value = true;

      await $fetch("/api/event", {
        method: "post",
        body: payload,
      });
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
  };
});
