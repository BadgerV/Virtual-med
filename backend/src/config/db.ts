import { PrismaClient } from "@prisma/client";
import { env } from "./env";

export const prisma = new PrismaClient({
  datasources: { db: { url: env.DATABASE_URL } },
});

prisma.$connect()
  .then(() => {
    console.log("✅ Database connected successfully!");
  })
  .catch((error ) => {
    console.error("❌ Database connection failed:", error);
    process.exit(1); // Exit the process if the connection fails
  });