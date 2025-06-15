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

type ForgetPasswordOTPPayload = {
  email: string;
};

type ResetPasswordPayload = {
  email: string;
  otp: string;
  password: string;
};

export const useAuthStore = defineStore("useAuthStore", () => {
  const {
    errorToast,
  } = useAppToast();
  const session = ref<Awaited<ReturnType<typeof authClient.useSession>> | null>(null);

  async function init() {
    const data = await authClient.useSession(useFetch);
    session.value = data;
  }

  const sessionLoading = computed(() => session.value?.isPending);
  const user = computed(() => session.value?.data?.user);
  const loading = ref(false);
  const success = ref(false);

  // Helper function to get CSRF headers with proper error handling
  async function getCsrfHeaders() {
    try {
      const {
        csrf,
      } = useCsrf();

      // Wait for CSRF token to be available
      if (!csrf) {
        console.warn("CSRF token not available, retrying...");
        await new Promise(resolve => setTimeout(resolve, 100));
        const {
          csrf: retryToken,
        } = useCsrf();
        if (!retryToken) {
          throw new Error("CSRF token unavailable after retry");
        }
        return {
          "csrf-token": retryToken,
        };
      }

      return {
        "csrf-token": csrf,
      };
    }
    catch (error) {
      console.error("Failed to get CSRF token:", error);
      throw error;
    }
  }

  async function signUp(payload: SignUpPayload) {
    success.value = false;
    loading.value = true;

    try {
      const csrfHeaders = await getCsrfHeaders();

      const {
        error,
      } = await authClient.signUp.email({
        ...payload,
        fetchOptions: {
          headers: csrfHeaders,
          // Add credentials for cross-origin requests
          credentials: "same-origin",
        },
      });

      if (error) {
        errorToast(error?.message as string);
      }
      else {
        success.value = true;
      }
    }
    catch (error) {
      console.error("SignUp error:", error);
      errorToast("Authentication failed. Please try again.");
    }
    finally {
      loading.value = false;
    }
  }

  async function signIn(payload: SignUpPayload) {
    success.value = false;
    loading.value = true;

    try {
      const csrfHeaders = await getCsrfHeaders();

      const {
        error,
      } = await authClient.signIn.email({
        ...payload,
        fetchOptions: {
          headers: csrfHeaders,
          credentials: "same-origin",
        },
      });

      if (error) {
        errorToast(error?.message as string);
      }
      else {
        await navigateTo("/dashboard");
      }
    }
    catch (error) {
      console.error("SignIn error:", error);
      errorToast("Authentication failed. Please try again.");
    }
    finally {
      loading.value = false;
    }
  }

  async function googleSignIn() {
    success.value = false;
    loading.value = true;

    try {
      const csrfHeaders = await getCsrfHeaders();

      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/dashboard",
        errorCallbackURL: "/error",
        fetchOptions: {
          headers: csrfHeaders,
          credentials: "same-origin",
        },
      });
    }
    catch (error) {
      console.error("Google SignIn error:", error);
      errorToast("Google sign-in failed. Please try again.");
      loading.value = false;
    }
  }

  async function forgetPasswordOTP(payload: ForgetPasswordOTPPayload) {
    success.value = false;
    loading.value = true;

    try {
      const csrfHeaders = await getCsrfHeaders();

      const {
        error,
      } = await authClient.emailOtp.sendVerificationOtp({
        email: payload.email,
        type: "forget-password",
        fetchOptions: {
          headers: csrfHeaders,
          credentials: "same-origin",
        },
      });

      if (error) {
        errorToast(error?.message as string);
      }
      else {
        await navigateTo(`/reset-password/${payload.email}`);
      }
    }
    catch (error) {
      console.error("Forget password error:", error);
      errorToast("Failed to send reset email. Please try again.");
    }
    finally {
      loading.value = false;
    }
  }

  async function resetPassword(payload: ResetPasswordPayload) {
    success.value = false;
    loading.value = true;

    try {
      const csrfHeaders = await getCsrfHeaders();

      const {
        error,
      } = await authClient.emailOtp.resetPassword({
        email: payload.email,
        otp: payload.otp,
        password: payload.password,
        fetchOptions: {
          headers: csrfHeaders,
          credentials: "same-origin",
        },
      });

      if (error) {
        errorToast(error?.message as string);
      }
      else {
        await navigateTo(`/log-in`);
      }
    }
    catch (error) {
      console.error("Reset password error:", error);
      errorToast("Failed to reset password. Please try again.");
    }
    finally {
      loading.value = false;
    }
  }

  async function logout() {
    success.value = false;

    try {
      const csrfHeaders = await getCsrfHeaders();

      await authClient.signOut({
        fetchOptions: {
          headers: csrfHeaders,
          credentials: "same-origin",
          onSuccess: async () => {
            await navigateTo("/log-in");
          },
        },
      });
    }
    catch (error) {
      console.error("Logout error:", error);
      // Still navigate to login even if logout fails
      await navigateTo("/log-in");
    }
  }

  return {
    init,
    loading,
    googleSignIn,
    signUp,
    signIn,
    forgetPasswordOTP,
    resetPassword,
    logout,
    sessionLoading,
    user,
    success,
  };
});
