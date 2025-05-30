import {
  betterAuth,
} from "better-auth";
import {
  drizzleAdapter,
} from "better-auth/adapters/drizzle";
import {
  emailOTP,
} from "better-auth/plugins";

import db from "./db/index";
import {
  sendEmail,
} from "./email";
import env from "./env";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "sqlite",
  }),
  advanced: {
    database: {
      generateId: false,
    },
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },
  emailVerification: {
    sendVerificationEmail: async ({
      user,
      url,
    }) => {
      const verificationUrl = new URL(url);
      verificationUrl.searchParams.set("callbackURL", "/log-in");
      await sendEmail(user.email, "verify-email", {
        url: verificationUrl.toString(),
      });
    },
    sendOnSignUp: true,
  },
  socialProviders: {
    google: {
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    },
  },
  plugins: [emailOTP({
    otpLength: 6,
    expiresIn: 300,
    allowedAttempts: 5,
    async sendVerificationOTP({
      email,
      otp,
      type,
    }) {
      if (type === "forget-password") {
        await sendEmail(email, "reset-password", {
          otp,
        });
      }
    },
  })],
});
