export {};

export type Roles = "admin" | "member" | "vendor";

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: Roles;
    };
  }
}
