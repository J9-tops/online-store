"use server";

import { auth } from "@/lib/auth";
import { authClient } from "@/lib/auth-client";
import { APIError } from "better-auth/api";
import { headers } from "next/headers";

export async function changePasswordAction(formData: FormData) {
  const currentPassword = String(formData.get("currentPassword"));
  if (!currentPassword) return { error: "Please enter your current password" };

  const newPassword = String(formData.get("newPassword"));
  if (!newPassword) return { error: "Please enter your new password" };

  try {
    await auth.api.changePassword({
      headers: await headers(),
      body: {
        currentPassword,
        newPassword,
      },
    });

    return { error: null };
  } catch (err) {
    if (err instanceof APIError) {
      return { error: err.message };
    }

    return { error: "Internal Server Error" };
  }
}

export async function forgotPasswordAction(formData: FormData) {
  const email = String(formData.get("email"));
  if (!email) return { error: "Please enter your email address" };

  try {
    await authClient.forgetPassword({
      email,
    });
    return { error: null };
  } catch (err) {
    if (err instanceof APIError) return { error: err.message };
    return { error: "Internal Server Error" };
  }
}

export async function resetPasswordAction(formData: FormData) {
  const token = String(formData.get("token"));
  const newPassword = String(formData.get("password"));

  if (!token || !newPassword)
    return { error: "Token and new password are required" };

  try {
    await authClient.resetPassword({
      newPassword,
      token,
    });
    return { error: null };
  } catch (err) {
    if (err instanceof APIError) return { error: err.message };
    return { error: "Internal Server Error" };
  }
}
