import { auth } from "@/lib/auth";
import { ac, roles } from "@/lib/permission";
import { adminClient, inferAdditionalFields } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  plugins: [
    inferAdditionalFields<typeof auth>(),
    adminClient({ ac, roles }),
    // customSessionClient<typeof auth>(),
    // magicLinkClient()
  ],
});

export const {
  signIn,
  signUp,
  signOut,
  admin,
  useSession,
  sendVerificationEmail,
  forgetPassword,
  resetPassword,
  updateUser,
} = authClient;
