import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

// ✅ Prevent multiple instances of PrismaClient in dev
const globalForPrisma = global as unknown as { prisma: PrismaClient };

const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["query"], // optional: logs queries in dev
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export async function GET() {
  try {
    const menuItems = await prisma.menuItem.findMany({
      where: { available: true }, // only show available items
    });
    return NextResponse.json(menuItems);
  } catch (error) {
    console.error("❌ Error fetching menu items:", error);
    return NextResponse.json({ error: "Failed to fetch menu" }, { status: 500 });
  }
}
