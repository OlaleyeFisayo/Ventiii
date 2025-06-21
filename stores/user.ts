import {
  authClient,
} from "~/lib/auth-client";

export const useUserStore = defineStore(
  "useUserStore",
  () => {
    const {
      errorToast,
      successToast,
    } = useAppToast();
    const loading = ref(false);
    const success = ref(false);
    const account = ref();

    async function getAccount() {
      loading.value = true;
      const accounts = await authClient.listAccounts();
      if (accounts) {
        account.value = accounts?.data[0];
      }
      loading.value = false;
    }

    async function updateUser(payload: {
      image?: string;
      name?: string;
    }) {
      success.value = false;
      loading.value = true;

      try {
        const csrfHeaders = await getCsrfHeaders();

        const {
          error,
        } = await authClient.updateUser({
          ...payload,
          fetchOptions: {
            headers: csrfHeaders,
            credentials: "same-origin",
          },
        });
        if (error) {
          errorToast(error.message as string);
        }
        else {
          success.value = true;
          successToast("Changes saved. Your account information is now up to date.");
        }
      }
      catch (error) {
        loading.value = false;
        console.error(
          "Update error:",
          error,
        );
        errorToast("User Update failed. Please try again.");
      }
      finally {
        loading.value = false;
      }
    }

    async function updateUserEmail(payload: {
      newEmail: string;
    }) {
      success.value = false;
      loading.value = true;

      try {
        const csrfHeaders = await getCsrfHeaders();

        const {
          error,
        } = await authClient.changeEmail({
          ...payload,
          callbackURL: "/log-in",
          fetchOptions: {
            headers: csrfHeaders,
            credentials: "same-origin",
          },
        });
        if (error) {
          errorToast(error.message as string);
        }
        else {
          success.value = true;
          successToast("We’ve sent a verification link to your current email. It might take a few minutes to arrive and could be in your spam folder.");
        }
      }
      catch (error) {
        loading.value = false;
        console.error(
          "Update error:",
          error,
        );
        errorToast("User Update failed. Please try again.");
      }
      finally {
        loading.value = false;
      }
    };

    async function updateUserPassword(payload: {
      newPassword: string;
      currentPassword: string;
    }) {
      success.value = false;
      loading.value = true;

      try {
        const csrfHeaders = await getCsrfHeaders();

        const {
          error,
        } = await authClient.changePassword({
          ...payload,
          revokeOtherSessions: true,
          fetchOptions: {
            headers: csrfHeaders,
            credentials: "same-origin",
          },
        });
        if (error) {
          errorToast(error.message as string);
        }
        else {
          success.value = true;
          successToast("Changes saved. Your account information is now up to date.");
        }
      }
      catch (error) {
        loading.value = false;
        console.error(
          "Update error:",
          error,
        );
        errorToast("User Update failed. Please try again.");
      }
      finally {
        loading.value = false;
      }
    }

    async function deleteUser() {
      success.value = false;
      loading.value = true;

      try {
        const csrfHeaders = await getCsrfHeaders();

        const {
          error,
        } = await authClient.deleteUser({
          callbackURL: "/",
          fetchOptions: {
            headers: csrfHeaders,
            credentials: "same-origin",
          },
        });
        if (error) {
          errorToast(error.message as string);
        }
        else {
          success.value = true;
          successToast("Account Deleted");
          await navigateTo("/");
        }
      }
      catch (error) {
        loading.value = false;
        console.error(
          "Update error:",
          error,
        );
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
      updateUserEmail,
      getAccount,
      account,
      updateUserPassword,
      deleteUser,
    };
  },
);
