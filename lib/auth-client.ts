import {
  emailOTPClient,
} from "better-auth/client/plugins";
import {
  createAuthClient,
} from "better-auth/vue";

export const authClient = createAuthClient({
  plugins: [emailOTPClient()],
});
