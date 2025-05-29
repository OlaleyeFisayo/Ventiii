import {
  authClient,
} from "~/lib/auth-client";

type SignInPayload = {
  email: string;
  password: string;
};

type SignUpPayload = SignInPayload & {
  name: string;
};

export const useAuthStore = defineStore("useAuthStore", () => {
  const {
    errorToast,
    successToast,
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
    else successToast("Verify your Email before you log in");

    loading.value = false;
  }

  async function signIn(payload: SignUpPayload) {
    loading.value = true;
    const {
      error,
    } = await authClient.signIn.email({
      ...payload,
    });
    if (error)
      errorToast(error?.message as string);
    else await navigateTo("/dashboard");

    loading.value = false;
  }

  async function googleSignIn() {
    loading.value = true;
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/dashboard",
    });
  };

  return {
    loading,
    googleSignIn,
    signUp,
    signIn,
  };
});
