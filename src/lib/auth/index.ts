import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies as nextCookiesPlugin } from "better-auth/next-js";
import {
  admin as adminPlugin,
  anonymous as anonymousPlugin,
  multiSession as multiSessionPlugin,
  openAPI as openAPIPlugin,
  username as usernamePlugin,
} from "better-auth/plugins";

import { env } from "@/config/env";
import { UserRole } from "@/generated/enums";
import { db } from "@/lib/db";

export const auth = betterAuth({
  appName: "boxslog",
  advanced: {
    database: {
      generateId: false,
    },
  },
  baseURL: env.BETTER_AUTH_URL,
  database: prismaAdapter(db, {
    provider: "postgresql",
  }),
  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          const isAdminEmails = env.ADMIN_EMAILS.includes(user.email);

          if (isAdminEmails) {
            return {
              data: {
                ...user,
                role: UserRole.ADMIN,
              },
            };
          }

          return {
            data: user,
          };
        },
      },
    },
  },
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    minPasswordLength: 8,
    maxPasswordLength: 128,
  },
  plugins: [
    adminPlugin(),
    anonymousPlugin(),
    multiSessionPlugin(),
    openAPIPlugin(),
    usernamePlugin(),
    nextCookiesPlugin(),
  ],
  secret: env.BETTER_AUTH_SECRET,
  session: {
    expiresIn: 60 * 60 * 24 * 3, // 3 days
  },
  trustedOrigins: [env.NEXT_PUBLIC_APP_URL],
  user: {
    additionalFields: {
      role: {
        type: [UserRole.ADMIN, UserRole.USER],
        defaultValue: UserRole.USER,
      },
    },
  },
});
