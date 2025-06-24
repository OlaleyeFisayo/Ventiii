import type {
  FetchError,
} from "ofetch";

export function useApiCall() {
  const {
    successToast,
    errorToast,
  } = useAppToast();

  const loading = ref(false);
  const success = ref(false);

  const execute = async (apiCall: () => Promise<any>) => {
    loading.value = true;
    success.value = false;

    try {
      const result = await apiCall();
      success.value = true;
      if (result.message) {
        successToast(result.message);
      }
      return result;
    }
    catch (e) {
      loading.value = false;
      const error = e as FetchError;
      errorToast(error.data?.statusMessage || error.statusMessage || "An unknown issue occured");
    }
    finally {
      loading.value = false;
    }
  };

  return {
    execute,
    loading,
    success,
  };
}
