import type {
  User,
} from "better-auth";

import {
  betterAuth,
} from "better-auth";
import {
  drizzleAdapter,
} from "better-auth/adapters/drizzle";
import {
  createAuthMiddleware,
  emailOTP,
} from "better-auth/plugins";

import db from "./db/index";
import {
  sendEmail,
} from "./email";
import env from "./env";

export type UserWithId = Omit<User, "id"> & {
  id: number;
};

export const auth = betterAuth({
  user: {
    deleteUser: {
      enabled: true,
    },
    changeEmail: {
      enabled: true,
      sendChangeEmailVerification: async ({
        user,
        url,
        newEmail,
      }) => {
        await sendEmail(
          user.email,
          "new-email",
          {
            url,
            newEmail,
          },
        );
      },
    },
  },
  hooks: {
    after: createAuthMiddleware(async (ctx) => {
      if (ctx.path === "/get-session") {
        if (!ctx.context.session) {
          return ctx.json({
            session: null,
            user: null,
          });
        }
        return ctx.json(ctx.context.session);
      }
    }),
  },
  database: drizzleAdapter(
    db,
    {
      provider: "sqlite",
    },
  ),
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
      verificationUrl.searchParams.set(
        "callbackURL",
        "/log-in",
      );
      await sendEmail(
        user.email,
        "verify-email",
        {
          url: verificationUrl.toString(),
        },
      );
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
        await sendEmail(
          email,
          "reset-password",
          {
            otp,
          },
        );
      }
    },
  })],
});
