import { UserRole } from "@prisma/client";
import { createAccessControl } from "better-auth/plugins/access";
import { adminAc, defaultStatements } from "better-auth/plugins/admin/access";

const statements = {
  ...defaultStatements,
  posts: ["create", "read", "update", "update:own", "delete:own", "delete"],
} as const;

export const ac = createAccessControl(statements);

export const roles = {
  [UserRole.User]: ac.newRole({
    posts: ["create", "delete:own", "read", "update:own"],
  }),
  [UserRole.Vendor]: ac.newRole({
    posts: ["create", "delete:own", "read", "update:own"],
  }),
  [UserRole.Admin]: ac.newRole({
    ...adminAc.statements,
    posts: ["create", "read", "delete:own", "update:own", "update", "delete"],
  }),
};
