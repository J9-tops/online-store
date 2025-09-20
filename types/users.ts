import { UserRole } from "@prisma/client";

export interface User {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string | null;
  role: UserRole;
  banned: boolean | null;
  banReason: string | null;
  banExpires: Date | null;
}

export interface UserStats {
  totalUsers: number;
  activeUsers: number;
  bannedUsers: number;
  adminUsers: number;
}

export interface UserFilters {
  search?: string;
  role?: UserRole | "All";
  status?: "Active" | "Banned" | "All";
  page?: number;
  limit?: number;
}

export interface BanUserData {
  userId: string;
  reason: string;
  expiresAt?: Date;
}

export interface UserActionResult {
  success: boolean;
  message: string;
  user?: User;
}
