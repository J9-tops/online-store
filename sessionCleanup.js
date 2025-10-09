import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();

async function cleanOldSessions() {
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

  try {
    const result = await prisma.session.deleteMany({
      where: { createdAt: { lt: sevenDaysAgo } },
    });

    console.log(`Deleted ${result.count} old sessions`);
  } catch (err) {
    console.error("Error cleaning old sessions:", err);
  } finally {
    await prisma.$disconnect();
  }
}

cleanOldSessions();
