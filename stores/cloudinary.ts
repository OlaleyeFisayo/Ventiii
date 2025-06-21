export const useCloudinaryStore = defineStore(
  "useCloudinaryStore",
  () => {
    const {
      errorToast,
    } = useAppToast();

    const loading = ref(false);

    async function upload(file: File) {
      try {
        loading.value = true;
        const name = "ventiiistorage";
        const preset = "Ventiii File management";
        const url = `https://api.cloudinary.com/v1_1/${name}/upload`;
        const formData = new FormData();

        formData.append(
          "file",
          file,
        );
        formData.append(
          "upload_preset",
          preset,
        );

        const response = await fetch(
          url,
          {
            method: "POST",
            body: formData,
          },
        );

        if (!response.ok) {
          throw new Error(`Upload failed: ${response.statusText}`);
        }

        const data = await response.json();
        return {
          url: data.secure_url,
        };
      }
      catch (error: any) {
        errorToast(error.message as string);
      }
      finally {
        loading.value = false;
      }
    }

    return {
      loading,
      upload,
    };
  },
);
