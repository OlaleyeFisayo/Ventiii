import {
  betterAuth,
} from "better-auth";
import {
  drizzleAdapter,
} from "better-auth/adapters/drizzle";

import db from "./db/index";
import env from "./env";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "sqlite",
  }),
  advanced: {
    generateId: false,
  },
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: env.GOOGLE_ClIENT_ID,
      clientSecret: env.GOOGLE_ClIENT_SECRET,
    },
  },
});
