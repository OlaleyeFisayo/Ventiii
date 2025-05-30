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

  async function forgetPasswordOTP(payload: ForgetPasswordOTPPayload) {
    loading.value = true;
    const {
      error,
    } = await authClient.emailOtp.sendVerificationOtp({
      email: payload.email,
      type: "forget-password",
    });
    if (error)
      errorToast(error?.message as string);
    else await navigateTo(`/reset-password/${payload.email}`);

    loading.value = false;
  }

  async function resetPassword(payload: ResetPasswordPayload) {
    loading.value = true;

    const {
      error,
    } = await authClient.emailOtp.resetPassword({
      email: payload.email,
      otp: payload.otp,
      password: payload.password,
    });

    if (error)
      errorToast(error?.message as string);
    else await navigateTo(`/log-in`);

    loading.value = false;
  }

  return {
    loading,
    googleSignIn,
    signUp,
    signIn,
    forgetPasswordOTP,
    resetPassword,
  };
});
