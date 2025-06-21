import {
  authClient,
} from "~/lib/auth-client";

export const useUserStore = defineStore("useUserStore", () => {
  const {
    errorToast,
  } = useAppToast();
  const loading = ref(false);
  const success = ref(false);

  async function updateUser(payload: {
    image?: string;
    name?: string;
  }) {
    success.value = false;
    loading.value = true;

    try {
      const csrfHeaders = await getCsrfHeaders();

      await authClient.updateUser({
        ...payload,
        fetchOptions: {
          headers: csrfHeaders,
          credentials: "same-origin",
        },
      });
      success.value = true;
    }
    catch (error) {
      loading.value = false;
      console.error("Update error:", error);
      errorToast("User Update failed. Please try again.");
    }
    finally {
      loading.value = false;
    }
  }

  return {
    loading,
    success,
    updateUser,
  };
});
