import {
  authClient,
} from "~/lib/auth-client";

export const useAuthStore = defineStore("useAuthStore", () => {
  const loading = ref(false);

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
  };
});
