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

  const session = authClient.useSession();
  const sessionLoading = computed(() => session.value.isPending || session.value.isRefetching);
  const user = computed(() => session.value?.data?.user);
  const loading = ref(false);
  const success = ref(false);

  async function signUp(payload: SignUpPayload) {
    const {
      csrf,
    } = useCsrf();
    const headers = new Headers();
    headers.append("csrf-token", csrf);
    success.value = false;
    loading.value = true;
    const {
      error,
    } = await authClient.signUp.email({
      ...payload,
      fetchOptions: {
        headers,
      },
    });
    if (error)
      errorToast(error?.message as string);
    else success.value = true;

    loading.value = false;
  }

  async function signIn(payload: SignUpPayload) {
    const {
      csrf,
    } = useCsrf();
    const headers = new Headers();
    headers.append("csrf-token", csrf);
    success.value = false;
    loading.value = true;
    const {
      error,
    } = await authClient.signIn.email({
      ...payload,
      fetchOptions: {
        headers,
      },
    });
    if (error)
      errorToast(error?.message as string);
    else await navigateTo("/dashboard");

    loading.value = false;
  }

  async function googleSignIn() {
    const {
      csrf,
    } = useCsrf();
    const headers = new Headers();
    headers.append("csrf-token", csrf);
    success.value = false;
    loading.value = true;
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/dashboard",
      errorCallbackURL: "/error",
      fetchOptions: {
        headers,
      },
    });
  };

  async function forgetPasswordOTP(payload: ForgetPasswordOTPPayload) {
    const {
      csrf,
    } = useCsrf();
    const headers = new Headers();
    headers.append("csrf-token", csrf);
    success.value = false;
    loading.value = true;
    const {
      error,
    } = await authClient.emailOtp.sendVerificationOtp({
      email: payload.email,
      type: "forget-password",
      fetchOptions: {
        headers,
      },
    });
    if (error)
      errorToast(error?.message as string);
    else await navigateTo(`/reset-password/${payload.email}`);

    loading.value = false;
  }

  async function resetPassword(payload: ResetPasswordPayload) {
    const {
      csrf,
    } = useCsrf();
    const headers = new Headers();
    headers.append("csrf-token", csrf);
    success.value = false;
    loading.value = true;

    const {
      error,
    } = await authClient.emailOtp.resetPassword({
      email: payload.email,
      otp: payload.otp,
      password: payload.password,
      fetchOptions: {
        headers,
      },
    });

    if (error)
      errorToast(error?.message as string);
    else await navigateTo(`/log-in`);

    loading.value = false;
  }

  async function logout() {
    const {
      csrf,
    } = useCsrf();
    const headers = new Headers();
    headers.append("csrf-token", csrf);
    success.value = false;
    await authClient.signOut({
      fetchOptions: {
        headers,
        onSuccess: async () => {
          await navigateTo("/log-in");
        },
      },
    });
  }

  return {
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
