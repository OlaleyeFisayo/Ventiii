import {
  authClient,
} from "~/lib/auth-client";

type SignUpPayload = {
  email: string;
  password: string;
  name: string;
};

export const useAuthStore = defineStore("useAuthStore", () => {
  const {
    errorToast,
  } = useAppToast();
  const loading = ref(false);

  async function signUp(payload: SignUpPayload) {
    loading.value = true;
    const {
      error,
    } = await authClient.signUp.email({
      ...payload,
    });
    if (error)
      errorToast(error?.message as string);
    else await navigateTo("/log-in");

    loading.value = false;
  }

  async function googleSignIn() {
    loading.value = true;
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/dashboard",
    });
    loading.value = false;
  };

  return {
    loading,
    googleSignIn,
    signUp,
  };
});
