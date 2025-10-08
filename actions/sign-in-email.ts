"use server";

import { auth, ErrorCode } from "@/lib/auth";
import { APIError } from "better-auth/api";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function signInEmailAction(formData: FormData) {
  const email = String(formData.get("email"));
  if (!email) return { error: "Please enter your email" };

  const password = String(formData.get("password"));
  if (!password) return { error: "Please enter your password" };

  try {
    await auth.api.signInEmail({
      headers: await headers(),
      body: {
        email,
        password,
      },
    });

    return { error: null };
  } catch (err) {
    if (err instanceof APIError) {
      const errCode = err.body ? (err.body.code as ErrorCode) : "UNKNOWN";
      console.dir(err, { depth: 5 });
      switch (errCode) {
        case "EMAIL_NOT_VERIFIED":
          redirect("/auth/verify?error=email_not_verified");
        default:
          return { error: err.message };
      }
    }
    console.log(err);
    return { error: "Internal Server Error" };
  }
}

//MANUALLY SETTING COOKIES

// "use server";

// import { auth, ErrorCode } from "@/lib/auth";
// import { APIError } from "better-auth/api";
// import { parseSetCookieHeader } from "better-auth/cookies";
// import { cookies, headers } from "next/headers";
// import { redirect } from "next/navigation";

// export async function signInEmailAction(formData: FormData) {
//   const email = String(formData.get("email"));
//   if (!email) return { error: "Please enter your email" };

//   const password = String(formData.get("password"));
//   if (!password) return { error: "Please enter your password" };

//   try {
//     const res = await auth.api.signInEmail({
//       headers: await headers(),
//       body: {
//         email,
//         password,
//       },
//       asResponse: true,
//     });

//     const setCookieHeader = res.headers.get("set-cookie");
//     if (setCookieHeader) {
//       const cookie = parseSetCookieHeader(setCookieHeader);
//       const cookieStore = await cookies();

//       const [key, cookieAttributes] = [...cookie.entries()][0];
//       const value = cookieAttributes.value;
//       const maxAge = cookieAttributes.maxAge;
//       const path = cookieAttributes.path;
//       const httpOnly = cookieAttributes.httpOnly;
//       const sameSite = cookieAttributes.sameSite;

//       cookieStore.set(key, decodeURIComponent(value), {
//         maxAge,
//         path,
//         httpOnly,
//         sameSite,
//       });
//     }

//     return { error: null };
//   } catch (err) {
//     if (err instanceof APIError) {
//       const errCode = err.body ? (err.body.code as ErrorCode) : "UNKNOWN";
//       console.dir(err, { depth: 5 });
//       switch (errCode) {
//         case "EMAIL_NOT_VERIFIED":
//           redirect("/auth/verify?error=email_not_verified");
//         default:
//           return { error: err.message };
//       }
//     }

//     return { error: "Internal Server Error" };
//   }
// }
