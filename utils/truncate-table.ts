import prisma from "@/lib/prisma";

export async function TruncateTable() {
  await prisma.$transaction([
    prisma.session.deleteMany(),
    prisma.account.deleteMany(),
    prisma.verification.deleteMany(),
    prisma.user.deleteMany(),
    prisma.product.deleteMany(),
    prisma.category.deleteMany(),
    prisma.sale.deleteMany(),
  ]);
}
