import { sendEmailAction } from "@/actions/send-email";
import { hashPassword, verifyPassword } from "@/lib/argon2";
import { ac, roles } from "@/lib/permission";
import prisma from "@/lib/prisma";
import { UserRole } from "@prisma/client";
import { betterAuth, BetterAuthOptions } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { admin, customSession } from "better-auth/plugins";

const options = {
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
    password: {
      hash: hashPassword,
      verify: verifyPassword,
    },
    sendResetPassword: async ({ user, url }) => {
      await sendEmailAction({
        to: user.email,
        subject: "Reset your password",
        meta: {
          description: "Please click the link below to reset your password.",
          link: String(url),
        },
      });
    },
  },
  emailVerification: {
    autoSignInAfterVerification: true,
    expiresIn: 60 * 60,
    sendOnSignUp: true,
    sendVerificationEmail: async ({ user, url }) => {
      const link = new URL(url);
      link.searchParams.set("callbackURL", "/");

      await sendEmailAction({
        to: user.email,
        subject: "Verify your email address",
        meta: {
          description:
            "Please verify your email address to complete the registration process.",
          link: String(link),
        },
      });
    },
  },
  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          const ADMIN_EMAILS = process.env.ADMIN_EMAILS?.split(";") ?? [];
          const VENDOR_EMAILS = process.env.VENDOR_EMAILS?.split(";") ?? [];

          if (ADMIN_EMAILS.includes(user.email)) {
            return { data: { ...user, role: UserRole.Admin } };
          }

          if (VENDOR_EMAILS.includes(user.email)) {
            return { data: { ...user, role: UserRole.Vendor } };
          }

          return { data: user };
        },
      },
    },
  },
  user: {
    additionalFields: {
      role: {
        type: ["User", "Admin", "Vendor"] as Array<UserRole>,
        input: false,
      },
    },
  },
  socialProviders: {
    google: {
      clientId: String(process.env.GOOGLE_CLIENT_ID),
      clientSecret: String(process.env.GOOGLE_CLIENT_SECRET),
    },
  },
  session: {
    expiresIn: 30 * 24 * 60 * 60,
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60,
    },
  },
  account: {
    accountLinking: {
      enabled: false,
    },
  },
  advanced: {
    database: {
      generateId: false,
    },
  },
  telemetry: { enabled: false },
  plugins: [
    admin({
      defaultRole: UserRole.User,
      adminRoles: [UserRole.Admin],
      ac,
      roles,
    }),
    nextCookies(),
  ],
} satisfies BetterAuthOptions;

export const auth = betterAuth({
  ...options,
  plugins: [
    ...(options.plugins ?? []),
    customSession(async ({ user, session }) => {
      return {
        session: {
          expiresAt: session.expiresAt,
          token: session.token,
          userAgent: session.userAgent,
        },
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
          createdAt: user.createdAt,
          role: user.role,
        },
      };
    }, options),
  ],
});

export type ErrorCode = keyof typeof auth.$ERROR_CODES | "UNKNOWN";
