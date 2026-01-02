import { JsonClient } from "./json-db";

const prismaClientSingleton = () => {
  return new JsonClient();
};

const prisma = globalThis.jsonPrismaGlobal ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") {
  globalThis.jsonPrismaGlobal = prisma;
}

// Cast to any to avoid type errors in consumers expecting a real PrismaClient
export default prisma as any;

declare global {
  // This augments globalThis instead of redeclaring it
  var jsonPrismaGlobal: ReturnType<typeof prismaClientSingleton> | undefined;
}
