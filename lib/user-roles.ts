// Client-safe user role types (mirrors Prisma UserRole enum)
// This file can be imported in client components without pulling in @prisma/client

export const UserRole = {
  Admin: "Admin",
  Vendor: "Vendor",
  User: "User",
} as const;

export type UserRole = (typeof UserRole)[keyof typeof UserRole];
