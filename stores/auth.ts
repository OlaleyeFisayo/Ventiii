import {
  authClient,
} from "~/lib/auth-client";

type SignUpPayload = {
  email: string;
  password: string;
  name: string;
};

export const useAuthStore = defineStore("useAuthStore", () => {
  const loading = ref(false);

  async function signUp(payload: SignUpPayload) {
    loading.value = true;
    await authClient.signUp.email({
      ...payload,
      callbackURL: "/log-in",
    });
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
