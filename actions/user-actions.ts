"use server";

import prisma from "@/lib/prisma";
import { UserRole } from "@prisma/client";

export async function getUsers() {
  try {
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return { users };
  } catch (err) {
    console.log(err);
    return { error: "Internal Server Error" };
  }
}

export async function searchUsers(
  searchTerm: string,
  roleFilter?: UserRole | "All"
) {
  try {
    const whereClause: any = {};

    if (searchTerm.trim()) {
      whereClause.OR = [
        {
          name: {
            contains: searchTerm,
            mode: "insensitive",
          },
        },
        {
          email: {
            contains: searchTerm,
            mode: "insensitive",
          },
        },
      ];
    }

    if (roleFilter && roleFilter !== "All") {
      whereClause.role = roleFilter;
    }

    const users = await prisma.user.findMany({
      where: whereClause,
      orderBy: {
        createdAt: "desc",
      },
    });

    return { users };
  } catch (err) {
    console.log(err);
    return { error: "Internal Server Error" };
  }
}

export async function updateUserBanStatus(
  userId: string,
  banned: boolean,
  banReason?: string,
  banExpires?: Date
) {
  try {
    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        banned,
        banReason: banned ? banReason : null,
        banExpires: banned ? banExpires : null,
        updatedAt: new Date(),
      },
    });

    return { user };
  } catch (err) {
    console.log(err);
    return { error: "Internal Server Error" };
  }
}

export async function updateUserRole(userId: string, role: UserRole) {
  try {
    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        role,
        updatedAt: new Date(),
      },
    });

    return { user };
  } catch (err) {
    console.log(err);
    return { error: "Internal Server Error" };
  }
}

export async function deleteUser(userId: string) {
  try {
    await prisma.user.delete({
      where: { id: userId },
    });

    return { success: true };
  } catch (err) {
    console.log(err);
    return { error: "Internal Server Error" };
  }
}
