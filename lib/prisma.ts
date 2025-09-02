import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") {
  globalThis.prismaGlobal = prisma;
}

export default prisma;

declare global {
  // This augments globalThis instead of redeclaring it
  var prismaGlobal: ReturnType<typeof prismaClientSingleton> | undefined;
}
