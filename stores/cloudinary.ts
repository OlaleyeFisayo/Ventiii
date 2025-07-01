export const useCloudinaryStore = defineStore(
  "useCloudinaryStore",
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

    async function upload(file: File) {
      const formData = new FormData();
      formData.append(
        "file",
        file,
      );
      const data = await execute(() => $csrfFetch(
        "/api/upload",
        {
          method: "post",
          body: formData,
        },
      ));

      if (success.value) {
        return data;
      }
    }

    async function deleteUpload(name: string) {
      const publicId = `ventiii/${name}`;
      await execute(() => $csrfFetch(
        "/api/upload",
        {
          method: "delete",
          body: {
            public_id: publicId,
          },
        },
      ));
    }

    return {
      loading,
      upload,
      success,
      deleteUpload,
    };
  },
);
